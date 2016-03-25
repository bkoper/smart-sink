/*
 The MIT License (MIT)

 Copyright (c) 2016 Bartlomiej Koper <bkoper@gmail.com>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the 'Software'), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

import fs from "fs";
import path from "path";
import EventEmitter from "events";
import artikIO from "./artik-io";

const staticValues = {
    value: {
        HIGH: 1,
        LOW: 0
    },
    direction: {
        INPUT: "in",
        OUTPUT: "out"
    },
    event: {
        CHANGE: "change",
        RISING: "rising",
        FALLING: "falling"
    }
};
const directionSet = new Set();
directionSet.add(staticValues.direction.OUTPUT).add(staticValues.direction.INPUT);
const valuesSet = new Set();
valuesSet.add(staticValues.value.HIGH).add(staticValues.value.LOW);

const GPIO_BASE_PATH = path.join("/", "sys", "class", "gpio");
const GPIO_BASE_RAW_PATH = path.join("/", "sys", "devices", "12d10000.adc", "iio:device0");
const GPIO_EXPORT = path.join(GPIO_BASE_PATH, "export");
const GPIO_UNEXPORT = path.join(GPIO_BASE_PATH, "unexport");

const getPinPath = (pin, subfolder = "") => path.join(GPIO_BASE_PATH, `gpio${pin}`, subfolder);
const getRawPinPath = pin => path.join(GPIO_BASE_RAW_PATH, `in_voltage${pin}_raw`);

function validate(setVariable, value) {
    if (!setVariable.has(value)) {
        throw new Error(`Invalid value: ${value}`);
    }
}

export default class Gpio extends EventEmitter {
    constructor(pin, debounceTime = 10) {
        super();
        this.pin = pin;
        this.debouceTime = debounceTime;
        this.value = 0;
    }

    load() {
        return new Promise((resolve, reject) => {
            fs.access(getPinPath(this.pin), fs.F_OK, err => {
                if (!err) {
                    resolve();
                } else if (err.errno === -2) {
                    fs.writeFile(GPIO_EXPORT, this.pin, err => err ? reject(err) : resolve());
                } else {
                    reject(err);
                }
            });
        });
    }

    unload() {
        return new Promise((resolve, reject) => {
            fs.writeFile(GPIO_UNEXPORT, this.pin, err => err ? reject(err) : resolve());
        });
    }

    pinMode(direction = staticValues.direction.INPUT) {
        validate(directionSet, direction);

        this.load(this.pin)
            .then(() => fs.writeFile(getPinPath(this.pin, "direction"), direction))
            .catch(err => console.warn(err));
    }

    digitalWrite(val = staticValues.value.LOW) {
        validate(valuesSet, val);

        return new Promise((resolve, reject) => {
            fs.writeFile(getPinPath(this.pin, "value"), val, err => err ? reject(err) : resolve());
        });
    }

    digitalRead() {
        return new Promise((resolve, reject) => {
            fs.readFile(getPinPath(this.pin, "value"), "utf8", (err, data) => err ? reject(err) : resolve(data));
        });
    }

    analogRead() {
        return new Promise((resolve, reject) => {
            fs.readFile(getRawPinPath(this.pin), "utf8", (err, data) => err ? reject(err) : resolve(data));
        });
    }

    on(event = staticValues.event.CHANGE, cb = null) {
        !this._getListenersNb() && this._startEventPinPulling();
        this.addListener(event, cb);
    }

    off(event = staticValues.event.CHANGE, cb = null) {
        this.removeListener(event, cb);
        !this._getListenersNb() && this._stopEventPinPulling();
    }

    _getListenersNb() {
        return this.listenerCount(staticValues.event.CHANGE) +
            this.listenerCount(staticValues.event.RISING) +
            this.listenerCount(staticValues.event.FALLING);
    }

    _startEventPinPulling() {
        this.intervalId = setInterval(() => {
            this.digitalRead().then((val) => {
                let newValue = +val;
                if (this.value !== newValue) {
                    this.emit(staticValues.event.CHANGE, newValue);
                    newValue === staticValues.value.HIGH ?
                        this.emit(staticValues.event.RISING, newValue) :
                        this.emit(staticValues.event.FALLING, newValue);
                    this.value = newValue;
                }
            })
        }, this.debouceTime);
    }

    _stopEventPinPulling() {
        clearInterval(this.intervalId);
    }
}

Object.assign(Gpio, staticValues, artikIO);
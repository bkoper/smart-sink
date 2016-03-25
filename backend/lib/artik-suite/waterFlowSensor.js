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

 Water Flow Sensor
 Model: YF-S201
 */

import Gpio from "./artik-gpio";
import Device from "./device";

const calibrationFactor = 7.5;
const maxSpeed = 10;
const watchdogThreshold = 1250;
const getTimestamp = () => (new Date).getTime();

export default class WaterFlowSensor extends Device {
    constructor(pin) {
        super(pin);
        this.reset();
        this.watchdogId = null;
    }

    initialize() {
        this.gpio = new Gpio(this.pin, 10);
        this.gpio.pinMode(Gpio.direction.INPUT);
    }

    turnOn() {
        this.gpio.on(Gpio.event.FALLING, () => this.pulseCount++);
        this.iv = setInterval(() => {
            if (this.pulseCount > 0) {
                this.lastTimestamp = getTimestamp();
                !this.watchdogId && this._watchdogStart();

                let flowRateRaw = this.pulseCount / calibrationFactor;
                this.flowRate = Math.round(flowRateRaw);
                this.percentSpeed = Math.round((flowRateRaw / maxSpeed) * 100);
                this.pulseCount = 0;

                let flown = roundNb((this.flowRate / 60));
                this.total += flown;

                this.emit(WaterFlowSensor.event.CHANGE);
            }
        }, 1000);
    }

    turnOff() {
        this.gpio.removeAllListeners(Gpio.event.FALLING);
        this.removeAllListener(WaterFlowSensor.event.CHANGE);
        clearInterval(this.watchdogId);
    }

    getFlowRate() {
        return this.flowRate;
    }

    getTotalMillilitres() {
        return roundNb(this.total);
    }

	getPercentSpeed() {
		return this.percentSpeed;
	}

    getData() {
        return {
            speed: this.flowRate,
            percentSpeed: this.percentSpeed,
            avg: 0,
            percentAvg: 0,
            max: 0,
            maxPercent: 0,
            total: parseFloat(this.total).toFixed(2)
        }
    }

    on(listener) {
        this.addListener(WaterFlowSensor.event.CHANGE, listener);
    }

    reset() {
        this.pulseCount = 0;
        this.flowRate = 0;
        this.total = 0;
        this.percentSpeed = 0;
        this.lastTimestamp = 0;
    }

    _watchdogStop() {
        clearInterval(this.watchdogId);
        this.watchdogId = null;
        this.percentSpeed = 0;
        this.flowRate = 0;
        this.emit(WaterFlowSensor.event.CHANGE);
    }

    _watchdogStart() {
        this.watchdogId = setInterval(() => {
            getTimestamp() - this.lastTimestamp > watchdogThreshold && this._watchdogStop();
        }, watchdogThreshold);
    }
}

WaterFlowSensor.event = {
    CHANGE: "WaterFlowSensor:change"
};

function roundNb(num) {
    return Math.round(num * 100) / 100;
}
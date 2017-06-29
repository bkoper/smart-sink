import {coldAlertStore, hotAlertStore} from '../model/alert-store';
import _ from 'lodash';
import {Led} from 'artik-io-devices';
import {GpioIO as ArtikIO} from 'artik-io';

const interval = 100;

let coldAlertStatus = {};
let hotAlertStatus = {};
let overallAlertStatus = {};

let gLed;
let yLed;
let rLed;

export default {
    init() {
        coldAlertStore.on(_.debounce(callbackCold, interval));
        hotAlertStore.on(_.debounce(callbackHot, interval));
        gLed = new Led(ArtikIO.pins.ARTIK_10['2']);
        yLed = new Led(ArtikIO.pins.ARTIK_10['3']);
        rLed = new Led(ArtikIO.pins.ARTIK_10['4']);

        gLed.turnOff();
        yLed.turnOff();
        rLed.turnOff();
    }
}

function callbackHot(value) {
    hotAlertStatus = value;
    propagate();
}

function callbackCold(value) {
    coldAlertStatus = value;
    propagate();
}

function propagate(){
    let yLedState;
    let rLedState;
    let gLedState;

    overallAlertStatus.limitPerStream = coldAlertStatus.limitPerStream || hotAlertStatus.limitPerStream;
    overallAlertStatus.openTime = coldAlertStatus.openTime || hotAlertStatus.openTime;
    overallAlertStatus.limitCrossedWarning = coldAlertStatus.limitCrossedWarning || hotAlertStatus.limitCrossedWarning;
    overallAlertStatus.dailyUsage = coldAlertStatus.dailyUsage || hotAlertStatus.dailyUsage;

    rLedState = overallAlertStatus.dailyUsage;
    yLedState = (overallAlertStatus.openTime || overallAlertStatus.limitPerStream) && !rLedState;
    gLedState = !(yLedState || rLedState);

    changeLedState(rLed, rLedState);
    changeLedState(yLed, yLedState);
    changeLedState(gLed, gLedState);
}

function changeLedState(led, state) {
    if(led.isOn() !== state) {
        state ? led.turnOn() : led.turnOff();
    }
}
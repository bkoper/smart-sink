import {coldAlertStore, hotAlertStore} from '../model/alert_store';
import _ from 'lodash';
import Led from '../lib/artik-suite/led';
import ArtikIO from '../lib/artik-suite/artik-io';

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
    overallAlertStatus.limitPerStream = coldAlertStatus.limitPerStream || hotAlertStatus.limitPerStream;
    overallAlertStatus.openTime = coldAlertStatus.openTime || hotAlertStatus.openTime;
    overallAlertStatus.limitCrossedWarning = coldAlertStatus.limitCrossedWarning || hotAlertStatus.limitCrossedWarning;
    overallAlertStatus.dailyUsage = coldAlertStatus.dailyUsage || hotAlertStatus.dailyUsage;

    (overallAlertStatus.openTime || overallAlertStatus.limitPerStream) ? yLed.turnOn() : yLed.turnOff();
    overallAlertStatus.dailyUsage ? rLed.turnOn() : rLed.turnOff();

    (yLed.isOn() || rLed.isOn()) ? gLed.turnOff() : gLed.turnOn();
};
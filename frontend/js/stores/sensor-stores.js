import AppStore from './app-store.js';
import Constants from '../constants/general';

let sensorState = {
    currentSpeed: 0,
    speedPercent: 0,
    avg: 0,
    max: 0,
    limitCrossedTimes: 0,
    dailyUsage: 0,
    longestOpenedMinutes: 0
};

let hotSensorStore = new AppStore(Constants.HOT_SENSOR_UPDATE, sensorState);
let coldSensorStore = new AppStore(Constants.COLD_SENSOR_UPDATE, sensorState);

export {hotSensorStore, coldSensorStore};
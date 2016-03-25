import AppStore from './app-store.js';
import Constants from '../constants/events';

let sensorState = {
    speed: 0,
    percentSpeed: 0,
    avg: 0,
    limitCrossedTimes: 0,
    total: 0,
    longestOpenedMinutes: 0,
    currentWaterFlown: 0,
    streamOpenTime: 0
};

let hotSensorStore = new AppStore(Constants.HOT_SENSOR_UPDATE, sensorState);
let coldSensorStore = new AppStore(Constants.COLD_SENSOR_UPDATE, sensorState);

export {hotSensorStore, coldSensorStore};
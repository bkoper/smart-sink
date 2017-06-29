import AppStore from './app-store.js';
import {HOT_SENSOR_UPDATE, COLD_SENSOR_UPDATE} from '../../../config/events';

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

let hotSensorStore = new AppStore(HOT_SENSOR_UPDATE, sensorState);
let coldSensorStore = new AppStore(COLD_SENSOR_UPDATE, sensorState);

export {hotSensorStore, coldSensorStore};
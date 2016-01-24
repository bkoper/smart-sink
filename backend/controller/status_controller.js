import socketIo from './websocket_service';
import constants from '../../frontend/js/constants/general';
import {coldSensor, hotSensor} from '../model/status_sensor';
import helpers from '../helpers/generics';

export default {
    init(server) {
        socketIo.init(server);
        setInterval(this.sendSensorData, 749);
        setInterval(this.sendDailyStats, 1230);
        setInterval(this.warningsUpdate, 2341);
    },

    sendSensorData() {
        let randomSensor = helpers.randomBool();
        let sensor = randomSensor ? coldSensor : hotSensor;
        let data = sensor.getData();

        data.currentSpeed = helpers.random100();
        data.speedPercent = helpers.random100();

        socketIo.emit(randomSensor ? constants.COLD_SENSOR_UPDATE : constants.HOT_SENSOR_UPDATE, data);
    },

    sendDailyStats() {
        let randomSensor = helpers.randomBool();
        let sensor = randomSensor ? coldSensor : hotSensor;
        let data = sensor.getData();

        data.avg = helpers.random100(50);
        data.max = helpers.random100();
        data.limitCrossedTimes = helpers.random100(5);
        data.dailyUsage = helpers.random100(10);
        data.longestOpenedMinutes = helpers.random100(50);

        socketIo.emit(randomSensor ? constants.COLD_SENSOR_UPDATE : constants.HOT_SENSOR_UPDATE, data);
    },

    warningsUpdate() {
        let randomSensor = helpers.randomBool();
        let sensor = randomSensor ? coldSensor : hotSensor;
        let data = sensor.getData();

        data.streamLimit = helpers.randomBool();
        data.streamOpenTime = helpers.randomBool();
        data.streamLimitCrossed = helpers.randomBool();
        data.dailyUsage = helpers.randomBool();

        socketIo.emit(randomSensor ? constants.COLD_ALERTS_UPDATE : constants.HOT_ALERTS_UPDATE, data);
    }
}

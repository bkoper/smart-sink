import {coldStatusStore, hotStatusStore} from '../model/status-store';
import {coldAlertStore, hotAlertStore} from '../model/alert-store';
import clientStore from '../model/clients';
import constants from '../../config/events';
import socketIo from './../lib/websocket-service';
import {coldSami, hotSami} from '../lib/websocket-cloud';
import webConfig from '../../config/config';
import units from '../helpers/unit';

const SAMI_UPDATE_INTERVAL = 10 * 1000;

export default {
	init(server) {
		socketIo.init(server);
		coldStatusStore.on(this.sendSensorData.bind(this, constants.COLD_SENSOR_UPDATE));
		hotStatusStore.on(this.sendSensorData.bind(this, constants.HOT_SENSOR_UPDATE));
		coldAlertStore.on(this.sendSensorData.bind(this, constants.COLD_ALERTS_UPDATE));
		hotAlertStore.on(this.sendSensorData.bind(this, constants.HOT_ALERTS_UPDATE));

		clientStore.on(webConfig.EVENT_CONNECTION, client => {
			console.info("client added")

			// socketIo.emitToOne(client, config.LIMITS_UPDATE, limitsStore.getState());
			socketIo.emitToOne(client, constants.HOT_SENSOR_UPDATE, hotStatusStore.getData());
			socketIo.emitToOne(client, constants.COLD_SENSOR_UPDATE, coldStatusStore.getData());
		});

		setInterval(() => {
			let coldStore = coldStatusStore.getData();
			let hotStore = hotStatusStore.getData();

			coldSami.sendData(+coldStore.avg, +coldStore.total);
			hotSami.sendData(+hotStore.avg, +hotStore.total);
		}, SAMI_UPDATE_INTERVAL);
	},

	sendSensorData(sensor, data) {
		socketIo.emit(sensor, Object.assign({}, data, {
			total: units.c(data.total),
			currentWaterFlown: units.c(data.currentWaterFlown)
		}));
	}
}
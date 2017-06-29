import {coldStatusStore, hotStatusStore} from '../model/status-store';
import {coldAlertStore, hotAlertStore} from '../model/alert-store';
import clientStore from '../model/clients';
import {COLD_SENSOR_UPDATE, HOT_SENSOR_UPDATE, COLD_ALERTS_UPDATE, HOT_ALERTS_UPDATE} from '../../config/events';
import socketIo from './../lib/websocket-service';
import {coldSami, hotSami} from '../lib/websocket-cloud';
import webConfig from '../../config/config';
import units from '../helpers/unit';

const SAMI_UPDATE_INTERVAL = 10 * 1000;

export default {
	init(server) {
		socketIo.init(server);
		coldStatusStore.on(this.sendSensorData.bind(this, COLD_SENSOR_UPDATE));
		hotStatusStore.on(this.sendSensorData.bind(this, HOT_SENSOR_UPDATE));
		coldAlertStore.on(this.sendSensorData.bind(this, COLD_ALERTS_UPDATE));
		hotAlertStore.on(this.sendSensorData.bind(this, HOT_ALERTS_UPDATE));

		clientStore.on(webConfig.EVENT_CONNECTION, client => {
			console.info("client added")

			// socketIo.emitToOne(client, config.LIMITS_UPDATE, limitsStore.getState());
			socketIo.emitToOne(client, HOT_SENSOR_UPDATE, hotStatusStore.getData());
			socketIo.emitToOne(client, COLD_SENSOR_UPDATE, coldStatusStore.getData());
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
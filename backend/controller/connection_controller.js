import StatusStore from '../model/status_store';
import {coldStatusStore, hotStatusStore} from '../model/status_store';
import {coldAlertStore, hotAlertStore} from '../model/alert_store';
import clientStore from '../model/clients';
import constants from '../../frontend/js/constants/events';
import socketIo from './../lib/websocket_service';
import {coldSami, hotSami} from '../lib/websocket_sami';
import limitsStore from '../model/settings_store';
import webConfig from '../../frontend/js/constants/config';
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
			console.log("client added")
			//socketIo.emitToOne(client, constants.LIMITS_UPDATE, limitsStore.getState());
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
			//currentSpeed: units.c(data.currentSpeed),
			total: units.c(data.total),
			//avg: units.c(data.total),
			currentWaterFlown: units.c(data.currentWaterFlown)
		}));
	}
}
import socketIo from './../lib/websocket_service';
import constants from '../../frontend/js/constants/events';
import {coldSensor, hotSensor} from '../lib/fakeSensors'
import WaterFlowSensor from '../lib/artik-suite/waterFlowSensor';
import ArtikIO from '../lib/artik-suite/artik-io';
import {coldStatusStore, hotStatusStore} from '../model/status_store';
import helpers from '../helpers/generics';

export default {
	init() {

		if(process.env.__demo) {
			coldSensor.on(() => this.updateStore(coldSensor, coldStatusStore));
			hotSensor.on(() => this.updateStore(hotSensor, hotStatusStore));
		} else {
			this.coldSensor = new WaterFlowSensor(ArtikIO.pins.ARTIK_10['8']);
			this.hotSensor = new WaterFlowSensor(ArtikIO.pins.ARTIK_10['9']);
			this.coldSensor.turnOn();
			this.hotSensor.turnOn();
			this.coldSensor.on(() => this.updateStore(this.coldSensor, coldStatusStore));
			this.hotSensor.on(() => this.updateStore(this.hotSensor, hotStatusStore));
		}

		this.setUpdateTime();
	},

	updateStore(sensor, store) {
		store.setData(sensor.getData());

		this.isNextDay();
	},

	isNextDay() {
		if( (new Date()).getDay() > this.firstUpdate.getDay() ) {
			coldSensor.reset();
			hotSensor.reset();
			coldStatusStore.reset();
			hotStatusStore.reset();
			this.setUpdateTime();
		}
	},

	setUpdateTime() {
		this.firstUpdate = new Date();
	}
};
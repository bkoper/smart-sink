import {coldSensor, hotSensor} from '../lib/fake-sensors'
import WaterFlowSensor from '../lib/artik-suite/water-flow-sensor';
import ArtikIO from '../lib/artik-suite/artik-io';
import {coldStatusStore, hotStatusStore} from '../model/status-store';

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
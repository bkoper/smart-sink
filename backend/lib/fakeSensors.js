import helpers from '../helpers/generics';
import {EventEmitter} from 'events';
import Helpers from '../helpers/generics';

class FakeDevice extends EventEmitter {
	constructor() {
		setInterval(() => this.emit(this.event.CHANGE), Helpers.random100() * 10);
	}

	on(listener) {
		this.addListener(WaterFlowSensor.event.CHANGE, listener);
	}

	getFlowRate() {
		return helpers.random100()
	}

	getTotalMillilitres() {
		return helpers.random100()
	}

	getPercentSpeed() {
		return helpers.random100()
	}
}

FakeDevice.event.CHANGE = "CHANGE";

let coldSensor = new FakeDevice();
let hotSensor = new FakeDevice();

export {coldSensor, hotSensor};
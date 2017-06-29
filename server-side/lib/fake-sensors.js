import {EventEmitter} from 'events';

const MAX_SPEED = 20;

class FakeDevice extends EventEmitter {
	constructor() {
		super();

		this.data = {
			speed: 0,
			percentSpeed: 0,
			avg: 0,
			percentAvg: 0,
			total: 0,
			max: 0,
			maxPercent: 0
		};

		let simulation = {
			data: [
				{
					speed: 0,
					mod: 0.05,
					timeout: 30 * 1000
				},
				{
					speed: 0,
					mod: 0,
					timeout: 10 * 1000
				},
				{
					speed: 15,
					mod: -0.05,
					timeout: 10 * 1000
				},
				{
					speed: 5,
					mod: 0,
					timeout: 70 * 1000
				},
				{
					speed: 0,
					mod: 0,
					timeout: 10 * 1000
				},
				{
					speed: 6,
					mod: 0,
					timeout: 120 * 1000
				},
				{
					speed: 0,
					mod: 0,
					timeout: 10 * 1000
				}
			],
			getData() {
				return this.data[+this.index];
			},
			nextIndex() {
				let length = this.data.length;
				this.index = ++this.index % length;
				return this.index;
			},
			nextPhase() {
				setTimeout( () => {
					simulation.nextIndex();
					this.dataObject.speed = simulation.getData().speed;
					this.nextPhase();
				}, this.getData().timeout);
			},

			init(dataObject) {
				this.index = Math.floor((Math.random() * this.data.length));
				this.dataObject = dataObject;
				this.nextPhase();
			}
		};

		setInterval( () => {
			this._calculateData(this.data.speed + simulation.getData().mod);
			this.emit(FakeDevice.event.CHANGE);
		}, 200);

		simulation.init(this.data)
	}

	on(listener) {
		this.addListener(FakeDevice.event.CHANGE, listener);
	}


	reset() {

	}

	getData() {
		var data = this.data;
		return {
			speed: Math.round(data.speed),
			percentSpeed: data.percentSpeed,
			total: parseFloat(data.total / 1000).toFixed(2),
		};
	}

	_calculateData(speed) {
		this.data.percentSpeed = Math.round(speed * 100 / MAX_SPEED);
		this.data.total += speed;
		this.data.speed = speed;
	}
}

FakeDevice.event = {
	CHANGE: "CHANGE"
};

let coldSensor = new FakeDevice();
let hotSensor = new FakeDevice();

export {coldSensor, hotSensor};
import helpers from '../helpers/generics';
import settnigsStore from './settings_store';
import {EventEmitter} from 'events';

class StatusStore extends EventEmitter {
    constructor() {
		super();
        this.reset();
    }

    getData() {
        return this.data;
    }

    setData(newData) {
        newData.streamOpenTime = this.data.streamOpenTime;
        newData.currentWaterFlown = this.data.currentWaterFlown;
        newData.limitCrossedTimes = this.data.limitCrossedTimes;
        newData.longestOpenedMinutes = this.data.longestOpenedMinutes;
        newData.avg = this.data.avg || 0;

        if(newData.speed > 0) {
            this.statistics.isStreamOpen = true;
            // limit crossed per stream open
            newData.currentWaterFlown = parseFloat(newData.total - this.statistics.totalUsageOnLastStreamOpen).toFixed(2);
            if(!this.statistics.limitCrossedLock && newData.currentWaterFlown > settnigsStore.getState().streamLimit) {
                this.statistics.limitCrossedLock = true;
                newData.limitCrossedTimes++;
            }

            newData.streamOpenTime =
                Math.round(((new Date()).getTime() - this.statistics.openStreamTimeStamp) / 1000);
            if (newData.streamOpenTime  > newData.longestOpenedMinutes) {
                newData.longestOpenedMinutes = newData.streamOpenTime;
            };

        } else {
            if(this.statistics.isStreamOpen) {
                this.statistics.isStreamOpen = false;
                this.statistics.streamCount++;
                newData.avg = Math.round(this.data.total / this.statistics.streamCount);
            };

            this.statistics.limitCrossedLock = false;
            this.statistics.totalUsageOnLastStreamOpen = this.data.total;
            this.statistics.openStreamTimeStamp = +(new Date()).getTime();
            newData.currentWaterFlown = 0;
            newData.streamOpenTime = 0;
        }

        this.data = newData;
        this.emit(StatusStore.events.CHANGE, newData);
    }

	on(listener) {
		this.addListener(StatusStore.events.CHANGE, listener);
	}

    reset() {
        this.data = {
            currentSpeed: 0,
            speedPercent: 0,
            total: 0,
            avg: 0,
            streamOpenTime: 0, // since last stream open
            currentWaterFlown: 0, // since last stream open
            limitCrossedTimes: 0,
            longestOpenedMinutes: 0
        };

        this.statistics = {
            totalTickCounter: 0,
            openStreamTimeStamp: +(new Date()).getTime(),
            limitCrossedLock: false, // it locks to check crossed limit once per open stream session
            totalUsageOnLastStreamOpen: 0,
            streamCount: 0,
            isStreamOpen: false
        }
    }

    _setValue(ob1, attr, currentValue) {
        ob1[attr] = currentValue > this.data[attr] ? currentValue : this.data[attr];
    }
};

StatusStore.events = {
	CHANGE: "STATUS_CHANGE"
};

let coldStatusStore = new StatusStore();
let hotStatusStore = new StatusStore();

export {coldStatusStore, hotStatusStore};
import {EventEmitter} from 'events';
import constants from '../../config/events';

class AlertStore extends EventEmitter {
    constructor(eventName) {
        super();
        this.data = {
            limitPerStream: false,
            openTime: false,
            limitCrossedWarning: false,
            dailyUsage: false
        };

        this.eventName = eventName;
    }

    on(listener) {
        this.addListener(this.eventName, listener);
    }

    setData(newData) {
        this.data = newData;
        this.emit(this.eventName, newData);
    }

    getData() {
        return this.data;
    }
}

let hotAlertStore = new AlertStore(constants.HOT_ALERTS_UPDATE);
let coldAlertStore = new AlertStore(constants.COLD_ALERTS_UPDATE);

export {coldAlertStore, hotAlertStore};
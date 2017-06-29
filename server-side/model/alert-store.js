import {EventEmitter} from 'events';
import {HOT_ALERTS_UPDATE, COLD_ALERTS_UPDATE} from '../../config/events';

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

let hotAlertStore = new AlertStore(HOT_ALERTS_UPDATE);
let coldAlertStore = new AlertStore(COLD_ALERTS_UPDATE);

export {coldAlertStore, hotAlertStore};
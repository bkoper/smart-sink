import $ from 'jquery';
import {EventEmitter} from 'events';
import Constants from '../../../config/events';
import Config from '../../../config/config';
import {register} from '../dispatchers/app-dispatcher';

const url = '/rest/saveMoney/';
const CHANGE_EVENT = "LIMITS:UPDATE";

export default class MoneySavingStore extends EventEmitter {
    constructor() {
        super();

        this.state = {
            units: 'litres',
            streamLimit: 4,
            streamOpenTime: 4,
            streamLimitCrossed: 8,
            dailyUsage: 23
        };

        this.init();
    }

    emitChange(event, data) {
        this.emit(event, data);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    fetchState(value=10) {
        $.get(`http://${Config.DOMAIN}:${Config.SERVER_PORT}${url}${value}`)
            .done(data => {
                this.state = data;
                this.emitChange(CHANGE_EVENT)
            });
    }

    getState() {
        return this.state;
    }

    init() {
        this.dispatcherIndex = register(function (action) {
            switch (action.actionType) {
                case Constants.MONEY_SAVE_UPDATE:
                    this.fetchState(action.item);
                    break;
            }

        }.bind(this))
    }
}

export default new MoneySavingStore();
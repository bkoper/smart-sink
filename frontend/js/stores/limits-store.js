import $ from 'jquery';
import {EventEmitter} from 'events';
import AppStore from './app-store.js';
import Constants from '../../../config/events';
import Config from '../../../config/config';
import {dispatch, register} from '../dispatchers/app-dispatcher';

let url = '/rest/settings';
const CHANGE_EVENT = "LIMITS:UPDATE";
const SAVE_EVENT = "LIMITS:SAVE";

export default class LimitStore extends EventEmitter {
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
        this.fetchState();
    }

    emitChange(event, data) {
        this.emit(event, data);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    addSaveListener(callback) {
        this.on(SAVE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    removeSaveListener(callback) {
        this.removeListener(SAVE_EVENT, callback);
    }

    fetchState() {
        $.get(`http://${Config.DOMAIN}:${Config.SERVER_PORT}${url}`)
            .done(data => {
                this.state = data;
                this.emitChange(CHANGE_EVENT)
            });
    }

    setState(data) {
        $.post(`http://${Config.DOMAIN}:${Config.SERVER_PORT}${url}`, data)
            .fail(() => this.emitChange(SAVE_EVENT, false))
            .done(data => {
                this.state = data;
                this.emitChange(SAVE_EVENT, true)
            });
    }

    getState() {
        return this.state;
    }

    init() {

        this.dispatcherIndex = register(function (action) {
            switch (action.actionType) {
                case Constants.LIMITS_GET:
                    this.fetchState();
                    break;
                case Constants.LIMITS_SET:
                    this.setState(action.item)
                    break;
            }

        }.bind(this))
    }
}

export default new LimitStore();
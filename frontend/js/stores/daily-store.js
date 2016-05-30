import {dispatch, register} from '../dispatchers/app-dispatcher';
import Consts from '../../../config/events';
import Config from '../../../config/config';
import {EventEmitter} from 'events';
import $ from 'jquery';

const DAILY_CHANGE_EVENT = 'dailyStore:change';
const MONTHLY_CHANGE_EVENT = 'monthlyStore:change';
const STATS_CHANGE_EVENT = 'statsRoute:change';
const STATUS_ERROR_EVENT = 'status:error';

const URL_DAILY = '/restRoutes/dailyStatus/';
const URL_MONTHLY = '/restRoutes/monthlyStatus/';
const URL_STATS = '/restRoutes/statsRoute/';

const DailyStatusStore = Object.assign({}, EventEmitter.prototype, {
    emitChange(event, data = {}){
        this[event] = data;
        this.emit(event);
    },

    addErrorListener(callback) {
        this.on(STATUS_ERROR_EVENT, callback);
    },

    removeErrorListener(callback) {
        this.removeListener(STATUS_ERROR_EVENT, callback);
    },

    addStatsChangeListener(callback){
        this.on(STATS_CHANGE_EVENT, callback);
    },

    removeStatsChangeListener(callback){
        this.removeListener(STATS_CHANGE_EVENT, callback);
    },

    addDailyChangeListener(callback){
        this.on(DAILY_CHANGE_EVENT, callback);
    },

    removeDailyChangeListener(callback){
        this.removeListener(DAILY_CHANGE_EVENT, callback);
    },

    addMonthlyChangeListener(callback) {
        this.on(MONTHLY_CHANGE_EVENT, callback);
    },

    removeMonthlyChangeListener(callback){
        this.removeListener(MONTHLY_CHANGE_EVENT, callback);
    },

    getDailyStatus() {
        return this[DAILY_CHANGE_EVENT];
    },

    getMonthlyStatus() {
        return this[MONTHLY_CHANGE_EVENT];
    },

    getStats() {
        return this[STATS_CHANGE_EVENT];
    },

    makeRequest(event) {
        let url;

        switch(event) {
            case DAILY_CHANGE_EVENT:
                url = URL_DAILY;
                break;
            case MONTHLY_CHANGE_EVENT:
                url = URL_MONTHLY;
                break;
            case STATS_CHANGE_EVENT:
                url = URL_STATS;
                break;
        }
        $.get(`http://${Config.DOMAIN}:${Config.SERVER_PORT}${url}`)
            .fail(err => this.emitChange(STATUS_ERROR_EVENT))
            .done(data => this.emitChange(event, data));
    },

    dispatcherIndex: register( function( action ){
        switch(action.actionType){
            case Consts.DAILY_STATUS:
                DailyStatusStore.makeRequest(DAILY_CHANGE_EVENT);
                break;
            case Consts.MONTHLY_STATUS:
                DailyStatusStore.makeRequest(MONTHLY_CHANGE_EVENT);
                break;
            case Consts.MONTHLY_STATS:
                DailyStatusStore.makeRequest(STATS_CHANGE_EVENT);
                break;
        }

        //DailyStatusStore.emitChange();

    })
});

export default DailyStatusStore;
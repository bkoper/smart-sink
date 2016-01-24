import React from 'react';
import Constants from '../constants/general';
import {dispatch} from "../dispatchers/app-dispatcher";

class AppActions {
    constructor(eventName) {
        this.dispatchEventName = eventName;
    }

    update(item) {
        dispatch({
            actionType: this.dispatchEventName,
            item
        })
    }
}

let hotSensorActions = new AppActions(Constants.HOT_SENSOR_UPDATE);
let coldSensorActions = new AppActions(Constants.COLD_SENSOR_UPDATE);
let hotAlertActions = new AppActions(Constants.HOT_ALERTS_UPDATE);
let coldAlertActions = new AppActions(Constants.COLD_ALERTS_UPDATE);
let generalActions = new AppActions(Constants.CHANGE_PAGE_EVENT);

export {hotSensorActions, coldSensorActions, generalActions, coldAlertActions, hotAlertActions};
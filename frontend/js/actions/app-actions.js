import React from 'react';
import Constants from '../constants/events';
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
let dailyStatusAction = new AppActions(Constants.DAILY_STATUS);
let monthlyStatusAction = new AppActions(Constants.MONTHLY_STATUS);
let monthlyStatsTableAction = new AppActions(Constants.MONTHLY_STATS);
let limitsGetAction = new AppActions(Constants.LIMITS_GET);
let limitsSetAction = new AppActions(Constants.LIMITS_SET);

export {
    hotSensorActions,
    coldSensorActions,
    generalActions,
    coldAlertActions,
    hotAlertActions,
    dailyStatusAction,
    monthlyStatusAction,
    monthlyStatsTableAction,
    limitsSetAction,
    limitsGetAction
};
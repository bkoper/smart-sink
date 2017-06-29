import React from 'react';
import Constants from '../../../config/events';
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

const hotSensorActions = new AppActions(Constants.HOT_SENSOR_UPDATE);
const coldSensorActions = new AppActions(Constants.COLD_SENSOR_UPDATE);
const hotAlertActions = new AppActions(Constants.HOT_ALERTS_UPDATE);
const coldAlertActions = new AppActions(Constants.COLD_ALERTS_UPDATE);
const generalActions = new AppActions(Constants.CHANGE_PAGE_EVENT);
const dailyStatusAction = new AppActions(Constants.DAILY_STATUS);
const monthlyStatusAction = new AppActions(Constants.MONTHLY_STATUS);
const monthlyStatsTableAction = new AppActions(Constants.MONTHLY_STATS);
const limitsGetAction = new AppActions(Constants.LIMITS_GET);
const limitsSetAction = new AppActions(Constants.LIMITS_SET);
const moneySaveAction = new AppActions(Constants.MONEY_SAVE_UPDATE);

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
    limitsGetAction,
    moneySaveAction
};
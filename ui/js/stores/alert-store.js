import AppStore from './app-store';
import Constants from '../../../config/events';

let alertState = {
    limitPerStream: false,
    openTime: false,
    limitCrossedWarning: false,
    dailyUsage: false
};

let hotAlertStore = new AppStore(Constants.HOT_ALERTS_UPDATE, alertState);
let coldAlertStore = new AppStore(Constants.COLD_ALERTS_UPDATE, alertState);

export {hotAlertStore, coldAlertStore};


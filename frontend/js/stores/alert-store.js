import AppStore from './app-store';
import Constants from '../constants/general';

let alertState = {
    streamLimit: false,
    streamOpenTime: false,
    streamLimitCrossed: false,
    dailyUsage: false
};

let hotAlertStore = new AppStore(Constants.HOT_ALERTS_UPDATE, alertState);
let coldAlertStore = new AppStore(Constants.COLD_ALERTS_UPDATE, alertState);

export {hotAlertStore, coldAlertStore    };


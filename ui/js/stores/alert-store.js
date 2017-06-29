import AppStore from './app-store';
import {HOT_ALERTS_UPDATE, COLD_ALERTS_UPDATE} from '../../../config/events';

const alertState = {
    limitPerStream: false,
    openTime: false,
    limitCrossedWarning: false,
    dailyUsage: false
};

const hotAlertStore = new AppStore(HOT_ALERTS_UPDATE, alertState);
const coldAlertStore = new AppStore(COLD_ALERTS_UPDATE, alertState);

export {hotAlertStore, coldAlertStore};


import {coldStatusStore, hotStatusStore} from '../model/status-store';
import {coldAlertStore, hotAlertStore} from '../model/alert-store';
import limitsStore from '../model/settings-store';

export default {
    init() {
        coldStatusStore.on((data) => this.updateAlerts(data, coldAlertStore));
        hotStatusStore.on((data) => this.updateAlerts(data, hotAlertStore));
        return this;
    },

    updateAlerts(data, alertStore) {
        let limits = limitsStore.getState();

        alertStore.setData({
            limitPerStream: +data.currentWaterFlown > +limits.streamLimit,
            openTime: +data.streamOpenTime > +limits.streamOpenTime,
            limitCrossedWarning: +data.limitCrossedTimes > +limits.streamLimitCrossed,
            dailyUsage: +data.total > +limits.dailyUsage
        });
    }
}
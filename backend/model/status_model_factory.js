import helpers from '../helpers/generics';

export default class StatusModel {
    constructor() {
        this.data = this.getDefaults();
    }

    getDefaults() {
        return {
            avg: 0,
            max: 0,
            limitCrossedTimes: helpers.random100(),
            dailyUsage: helpers.random100(30),
            longestOpenedMinutes: helpers.random100(60),
            currentSpeed: 0,
            speedPercent: 0,
            streamLimit: helpers.randomBool(),
            streamOpenTime: helpers.randomBool(),
            streamLimitCrossed: helpers.randomBool(),
            dailyUsage: helpers.randomBool()
        }
    }

    getData() {
        return this.data;
    }

    setData(newdata) {
        this.data = newdata;
    }
};
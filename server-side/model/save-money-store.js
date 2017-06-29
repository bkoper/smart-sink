import {mean, round} from 'lodash';
import {lastMonthStatistics} from '../lib/request-cloud';

const avgDaysInMonth = 30;
const precision = 2;

export default (value) => {
    return lastMonthStatistics().then(data => {
        const sum = mean([data[0].data.sum, data[1].data.sum]);
        const count = mean([data[0].data.count, data[1].data.count]);
        const averageDailyUsage = (sum / avgDaysInMonth);
        const averagePerStream = sum / count;
        const dailyStreamNb = count / avgDaysInMonth;

        const dailyUsage = round(subtractByValue(averageDailyUsage, value), precision);
        const streamLimit = round(subtractByValue(averagePerStream, value), precision);
        const streamLimitCrossed =  round(subtractByValue(dailyStreamNb, value) % 10, precision);

        return {
            dailyUsage,
            streamLimit,
            streamLimitCrossed
        }
    });
}

function subtractByValue(base, value) {
    return base - value * 0.01 * base;
}
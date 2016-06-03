import {mean, round} from 'lodash';
import {lastMonthStatistics} from '../lib/request-cloud';

const avgDaysInMonth = 30;
const precision = 2;

export default (value) => {
    return lastMonthStatistics().then(data => {
        let sum = mean([data[0].data.sum, data[1].data.sum]);
        let count = mean([data[0].data.count, data[1].data.count]);
        let averageDailyUsage = (sum / avgDaysInMonth);
        let averagePerStream = sum / count;
        let dailyStreamNb = count / avgDaysInMonth;

        let dailyUsage = round(substractByValue(averageDailyUsage, value), precision);
        let streamLimit = round(substractByValue(averagePerStream, value), precision);
        let streamLimitCrossed =  round(substractByValue(dailyStreamNb, value) % 10, precision);

        return {
            dailyUsage,
            streamLimit,
            streamLimitCrossed
        }
    });
}

function substractByValue(base, value) {
    return base - value * 0.01 * base;
}
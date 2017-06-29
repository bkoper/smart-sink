import jsonfile from 'jsonfile';
import {defaults} from 'lodash';
import units from '../helpers/unit';

const DATA_PATH = './build/settings.data';
const defaultLimits = {
    units: 'litres',
    streamLimit: 4, // litres
    streamOpenTime: 4, // seconds
    streamLimitCrossed: 8,
    dailyUsage: 25 // litres
};

fetchData(defaultLimits);

export default {
    getState() {
        return defaultLimits;
    },

    setState(data) {
        if (!('units' in data) && defaultLimits.units === 'gallons') {
            data.streamLimit = units.toLitres(data.streamLimit);
            data.dailyUsage = units.toLitres(data.dailyUsage);
        }

        defaultLimits = defaults(data, defaultLimits);
        saveLimits(defaultLimits);
    }
};

function saveLimits(data) {
    jsonfile.writeFileSync(DATA_PATH, data);
};

function fetchData() {
    try {
        defaultLimits = defaults(jsonfile.readFileSync(DATA_PATH, ['w+']), defaultLimits);
    } catch (e) {
        saveLimits(defaultLimits);
    }
    return defaultLimits;
};

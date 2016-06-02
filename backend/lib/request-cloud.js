import _ from 'lodash';
import request from 'request-promise';
import config from '../../config/config';
import authCloud from './auth-cloud';

function preapreDailyRequest() {
    const date = new Date();
    const startDate = (new Date(date.getFullYear(), date.getMonth(), date.getDay() )).valueOf();
    const endDate = (new Date(date.getFullYear(), date.getMonth(), date.getDay(), 23, 59)).valueOf();

    return sdid => prepareRequest(sdid, startDate, endDate, "hour", "total");
}

function preapreDailyResponse(response) {
    const responseData = JSON.parse(response).data;
    let hourUsage = _.fill(_.range(24), 0);

    _.map(responseData, data => {
        hourUsage = _.fill(hourUsage, data.max, (new Date(data.ts)).getHours());
    });

    return hourUsage;
}

function prepareMonthlyRequest() {
    const date = new Date();
    const startDate = (new Date(date.getFullYear(), date.getUTCMonth(), 1 )).valueOf();
    const endDate = (new Date(date.getFullYear(), date.getUTCMonth(), daysInMonth(date.getFullYear(), date.getUTCMonth()) , 23, 59)).valueOf();

    return sdid => prepareRequest(sdid, startDate, endDate, "day", "total");
}

function prepareMonthlyResponse(response) {
    const date = new Date();
    const daysInCurrentMonth = daysInMonth(date.getFullYear(), date.getMonth());
    const responseData = JSON.parse(response).data;
    let monthlyUsage = _.fill(_.range(daysInCurrentMonth), 0);

    _.map(responseData, data => {
        _.fill(monthlyUsage, data.sum, (new Date(data.ts)).getDate());
    });

    return monthlyUsage;
}

function monthlyStatsRequest(field) {
    const date = new Date();
    const startDate = (new Date(date.getFullYear(), date.getUTCMonth(), 1 )).valueOf();
    const endDate = (new Date(date.getFullYear(), date.getUTCMonth(), daysInMonth(date.getFullYear(), date.getUTCMonth()) , 23, 59)).valueOf();

    return sdid => prepareRequest(sdid, startDate, endDate, "month", field);
}

function preapreMonthlyStatsResponse(response) {
    return JSON.parse(response);
}

function prepareLastMonthRequest() {
    const date = new Date();
    let lastMonth = date.getMonth() - 1;
    let currentYear = date.getFullYear();

    if (lastMonth < 0) {
        currentYear--;
        lastMonth = 11;
    }

    const startDate = (new Date(currentYear, lastMonth, 1 )).valueOf();
    const endDate = (new Date(currentYear, lastMonth, daysInMonth(currentYear, lastMonth) , 23, 59)).valueOf();

    return sdid => prepareRequest(sdid, startDate, endDate, "month", "total");
}

function prepareLastMotnthStatsResponse(response) {
    let requestData = JSON.parse(response);

    return {
        sum: requestData.data[0].sum,
        count: requestData.data[0].count
    }
}

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

function prepareRequest(sdid, startDate, endDate, interval, field) {
     return  {
        method: "GET",
        uri: config.CLOUD_REST_URL,
        qs: {
            startDate, //: '1456873200000',
            endDate, //: '1456959540000',
            sdid,
            interval,
            field
        },
        headers: {
            'Authorization': `bearer ${authCloud.token}`,
            'Content-Type': 'application/json'
        }
    };
}

function makeRequest(prepareRequest, prepareResponse) {
    const prepare = prepareRequest();
    let dataSets = [];

    return request(prepare(config.HOT_WATER_SDID))
        .then(response => {
            dataSets.push({data: prepareResponse(response)});
            return request(prepare(config.COLD_WATER_SDID));
        })
        .then(response => {
            dataSets.push({data: prepareResponse(response)});
            return dataSets;
        })
        .catch(err => {
            throw err;
        });
}

let dailyRequest = () => makeRequest(preapreDailyRequest, preapreDailyResponse);
let monthlyRequest = () => makeRequest(prepareMonthlyRequest, prepareMonthlyResponse);
let monthlyStatistics = () => {
    let data = [];
    return makeRequest(monthlyStatsRequest.bind(null, "total"), preapreMonthlyStatsResponse)
        .then(response => {
            data.push(response);
            return makeRequest(monthlyStatsRequest.bind(null, "avg"), preapreMonthlyStatsResponse)
        })
        .then(response => {
            data.push(response);
            return data;
        });
};
let lastMonthStatistics = () => {
    return makeRequest(prepareLastMonthRequest, prepareLastMotnthStatsResponse);
};

export {dailyRequest, monthlyRequest, monthlyStatistics, lastMonthStatistics};

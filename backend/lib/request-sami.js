import {fill, clone} from 'lodash';
import request from 'request-promise';

const hotWaterSdid = '8cab91bd1a584793b35996a611485928';
const coldWaterSdid = '52bee04947e24a5da1dfa6b811949695';

let arrayDefault = [];
let datasets = [];
let currentDate = new Date();

function makeRequest(prepare, prepareResponse) {
    let reqPrepare = prepare();
    return request(reqPrepare(hotWaterSdid))
        .then(response => {
            datasets[0].data = prepareResponse(response, datasets[0].data);
        })
        .then(() => request(reqPrepare(coldWaterSdid)))
        .then(response => {
            datasets[1].data = prepareResponse(response, datasets[1].data);
            return datasets;
        })
        .catch(err => {
            throw err;
        });
}

function preapreDailyRequest() {
    let date = new Date();
    let startDate = (new Date(date.getFullYear(), date.getMonth(), date.getDay() )).valueOf();
    let endDate = (new Date(date.getFullYear(), date.getMonth(), date.getDay(), 23, 59)).valueOf();

    arrayDefault = [];
    arrayDefault.length = 24;
    arrayDefault = fill(arrayDefault, 0);
    datasets = [{ data: clone(arrayDefault)}, {data: clone(arrayDefault)}];

    return sdid => prepareRequest(sdid, startDate, endDate, "hour", "total");
}

function preapreDailyResponse(response, arr) {
    var responseData = JSON.parse(response.body).data;
    for(var i in responseData) {
        var data = responseData[i];
        arr = fill(arr, data.max, (new Date(data.ts)).getHours());
    }
    return arr;
}

function prepareMonthlyRequest() {
    let date = new Date();
    let startDate = (new Date(date.getFullYear(), date.getUTCMonth(), 1 )).valueOf();
    let endDate = (new Date(date.getFullYear(), date.getUTCMonth(), daysInMonth(date.getFullYear(), date.getUTCMonth()) , 23, 59)).valueOf();

    arrayDefault.length = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    arrayDefault = fill(arrayDefault, 0);
    datasets = [{ data: clone(arrayDefault)}, {data: clone(arrayDefault)}];

    return sdid => prepareRequest(sdid, startDate, endDate, "day", "total");
}

function monthlyStatsRequest(field) {
    let date = new Date();
    let startDate = (new Date(date.getFullYear(), date.getUTCMonth(), 1 )).valueOf();
    let endDate = (new Date(date.getFullYear(), date.getUTCMonth(), daysInMonth(date.getFullYear(), date.getUTCMonth()) , 23, 59)).valueOf();

    arrayDefault.length = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    arrayDefault = fill(arrayDefault, 0);
    datasets = [{ data: clone(arrayDefault)}, {data: clone(arrayDefault)}];

    return sdid => prepareRequest(sdid, startDate, endDate, "month", field);
}

function preapreMonthlyStatsResponse(response, arr) {
    arr = JSON.parse(response.body);
    return arr;
}

function prepareRequest(sdid, startDate, endDate, interval, field) {
    return  {
        url: 'https://api.samsungsami.io/v1.1/messages/analytics/histogram',
        method: "GET",
        qs: {
            startDate, //: '1456873200000',
            endDate, //: '1456959540000',
            sdid,
            interval,
            field
        },
        headers: {
            'Authorization': 'bearer 123212342',
            'Content-Type': 'application/json'
        }
    };
}

function prepareMonthlyResponse(response, arr) {
    var responseData = JSON.parse(response.body).data;
    for(var i in responseData) {
        var data = responseData[i];
        arr = fill(arr, data.max, (new Date(data.ts)).getDate(), currentDate.getDate());
    }
    return arr;
}

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
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
            data.push(response)
            return data;
        });
}
export {dailyRequest, monthlyRequest, monthlyStatistics}

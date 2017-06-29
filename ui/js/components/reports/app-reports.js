import React from 'react';
import _ from 'lodash';
import AuthButton from '../generics/auth-button';
import Header from '../generics/page-header';
import Jumbotron from '../generics/jumbotron';
import {generalActions, monthlyStatusAction, monthlyStatsTableAction} from '../../actions/app-actions';
import dailyStore from '../../stores/daily-store';
import {PAGE_REPORTS} from '../../../../config/events';
import LineChart from '../generics/line-chart';
import SummaryTable from './summary-table';

export default class extends React.Component {
    constructor(props) {
        super(props);
        let currentDate = new Date();
        let days = (new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)).getDate() + 1;
        let chartData = {
            labels: _.range(1, days),
            datasets: [10,20]
        };
        this.state = {
            chartData,
            authorization: true
        };
        this._updateView = this._updateView.bind(this);
        this._authorizationError = this._authorizationError.bind(this);
    }

    componentDidMount() {
        generalActions.update(PAGE_REPORTS);
        monthlyStatusAction.update();
        monthlyStatsTableAction.update();
    }

    componentWillMount() {
        dailyStore.addMonthlyChangeListener(this._updateView);
        dailyStore.addErrorListener(this._authorizationError);
    }

    componentWillUnmount() {
        dailyStore.removeMonthlyChangeListener(this._updateView);
        dailyStore.removeErrorListener(this._authorizationError);
    }

    _updateView() {
        let dailyStatus = dailyStore.getMonthlyStatus();
        let chartData = this.state.chartData;
        chartData.datasets = dailyStatus;
        this.setState({
            chartData,
            authorization: true
        });
    }

    _authorizationError() {
        this.setState({
            authorization: false
        })
    }

    render() {
        return (
            <div>
                <LineChart
                    title="Monthly overview of total usage"
                    subtitle="history"
                    data={this.state.chartData}
                    authorization={this.state.authorization}
                />

                <Header subtitle="more info" title="Summary table"/>
                {this.state.authorization ?
                    <SummaryTable /> :
                    <AuthButton />}

                <Header subtitle="other" title="Page info"/>
                <Jumbotron text="Here you can see your water usage statitcs for last days "/>
            </div>
        );
    }
}
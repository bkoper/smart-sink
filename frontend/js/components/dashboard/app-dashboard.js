import React from 'react';
import Header from '../generics/page-header';
import Jumbotron from '../generics/jumbotron';
import {generalActions, dailyStatusAction, limitsGetAction} from '../../actions/app-actions';
import Constants from '../../../../config/events';
import AlertSection from './alert-section-dashboard';
import AlertTable from './alert-table';
import LimitsTable from './limit-table';
import SensorSection from './sensor-section';
import DailyGraph from './daily-graph';

export default class Dashboard extends React.Component {
    componentDidMount() {
        generalActions.update(Constants.PAGE_DASHBOARD);
        dailyStatusAction.update();
        limitsGetAction.update();
    }

    render() {


        return (
            <div id="dashboard">
                <SensorSection />

                <AlertSection />

                <AlertTable />

                <LimitsTable />

                <DailyGraph />

                <Header subtitle="other" title="Page info"/>
                <Jumbotron text="On this page can see live update for your water usage"/>
            </div>
        )
    }
}
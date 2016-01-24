import React from 'react';
import Header from '../generics/page-header';
import Jumbotron from '../generics/jumbotron';
import {generalActions} from '../../actions/app-actions';
import Constants from '../../constants/general';
import AlertSection from './alert-section-dashboard';
import AlertTable from './alert-table';
import SensorSection from './sensor-section';

export default class Dashboard extends React.Component {
    componentDidMount() {
        generalActions.update(Constants.PAGE_DASHBOARD);
    }

    render() {
        return (
            <div id="dashboard">
                <SensorSection />

                <AlertSection />

                <AlertTable />

                <Header subtitle="graph" title="Daily water usage"/>

                <Header subtitle="other" title="Page info"/>
                <Jumbotron text="On this page can see live update for your water usage"/>
            </div>
        )
    }
}
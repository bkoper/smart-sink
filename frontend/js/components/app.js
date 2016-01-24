import React from 'react';
import Template from './app-template';
import Dashboard from './dashboard/app-dashboard';
import Reports from './reports/app-reports';
import Settings from './settings/app-settings';
import Savings from './savings/app-savings';
import {Router, Route, IndexRoute} from 'react-router';

export default () => {
    return (
        <Router>
            <Route path="/" component={Template}>
                <IndexRoute component={Dashboard}/>
                <Route path="/reports" component={Reports}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/savings" component={Savings}/>
            </Route>
        </Router>
    )
}

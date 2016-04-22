import React from 'react';
import {Link} from 'react-router';
import GeneralStore from '../../stores/general-store';
import Constants from '../../../../config/events';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        GeneralStore.addChangeListener(this._onChange);
        this._onChange();
    }

    componentWillUnmount() {
        GeneralStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            page: GeneralStore.getActivePage()
        });
    }

    _getClass(pageConst) {
        return this.state.page === pageConst && "active";
    }

    render() {
        return (
            <ul className="app-menu nav nav-pills nav-stacked">
                <li role="presentation" className={this._getClass(Constants.PAGE_DASHBOARD)}>
                    <Link to="/">Dashboard</Link>
                </li>
                <li role="presentation" className={this._getClass(Constants.PAGE_REPORTS)}>
                    <Link to="reports">Summary reports</Link>
                </li>
                <li role="presentation" className={this._getClass(Constants.PAGE_SETTINGS)}>
                    <Link to="settings">Settings</Link>
                </li>
                <li role="presentation" className={this._getClass(Constants.PAGE_SAVINGS)}>
                    <Link to="savings">Save money</Link>
                </li>
            </ul>
        );
    }
}
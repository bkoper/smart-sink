import React from 'react';
import Header from '../generics/page-header';
import Jumbotron from '../generics/jumbotron';
import {generalActions} from '../../actions/app-actions';
import Constants from '../../constants/general';

export default class extends React.Component {
    componentDidMount() {
        generalActions.update(Constants.PAGE_SETTINGS);
    }

    render() {
        return (
            <div>
                <Header subtitle="limits" title="Water usage"/>
                <Header subtitle="settings" title="Application settings"/>

                <Header subtitle="other" title="Page info"/>
                <Jumbotron text="Here you can set all the limits and warning levels to save water money and earth!" />
            </div>
        );

    }
}
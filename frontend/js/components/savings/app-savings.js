import React from 'react';
import Header from '../generics/page-header';
import Jumbotron from '../generics/jumbotron';
import {generalActions} from '../../actions/app-actions';
import Constants from '../../constants/general';

export default class extends React.Component {
    componentDidMount() {
        generalActions.update(Constants.PAGE_SAVINGS);
    }

    render() {
        return (
            <div>
                <Header subtitle="extras" title="Savings analysis" />

                <Header subtitle="other" title="Page info" />
                <Jumbotron text="Estimate amount that you want to save - based on your habits and historical
        data we will advice you what limits should you assign. Then dashboard alerts and led indicator at
        your sink will lead you to your savings goals." />
            </div>
        );
    }
}
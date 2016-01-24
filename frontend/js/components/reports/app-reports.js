import React from 'react';
import Header from '../generics/page-header';
import Jumbotron from '../generics/jumbotron';
import {generalActions} from '../../actions/app-actions';
import Constants from '../../constants/general';

export default class extends React.Component {
    componentDidMount() {
        generalActions.update(Constants.PAGE_REPORTS);
    }

    render() {
        return (
            <div>
                <Header subtitle="history" title="Overview"/>
                <Header subtitle="more info" title="Summary table"/>

                <Header subtitle="other" title="Page info"/>
                <Jumbotron text="Here you can see your water usage statitcs for last days "/>
            </div>
        );
    }
}
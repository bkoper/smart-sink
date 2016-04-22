import React from 'react';
import Header from '../generics/page-header';
import Jumbotron from '../generics/jumbotron';
import {generalActions} from '../../actions/app-actions';
import Constants from '../../../../config/events';
import {Button, Input, Alert} from 'react-bootstrap';

export default class extends React.Component {
    componentDidMount() {
        generalActions.update(Constants.PAGE_SAVINGS);
    }

    render() {
        return (
            <div>
                <Header subtitle="extras" title="Savings analysis" />
                <Input
                    type="select"
                    label="Your monthly savings"
                    defaultValue="option1"
                >
                    <option value="option1">10%</option>
                    <option value="option2">15%</option>
                    <option value="option2">20%</option>
                    <option value="option2">25%</option>
                    <option value="option2">30%</option>
                </Input>

                <Alert
                    bsStyle="warning"
                ><strong>This feature is not yet ready, stay tuned.</strong></Alert>

                <Button
                    disabled={true}
                    bsStyle='primary'>
                    apply
                </Button>

                <Header subtitle="other" title="Page info" />
                <Jumbotron text="Estimate amount that you want to save - based on your habits and historical
        data we will advice you what limits should you assign. Then dashboard alerts and led indicator at
        your sink will lead you to your savings goals." />
            </div>
        );
    }
}
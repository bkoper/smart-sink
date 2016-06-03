import React from 'react';
import Header from '../generics/page-header';
import Jumbotron from '../generics/jumbotron';
import {generalActions, moneySaveAction, limitsSetAction} from '../../actions/app-actions';
import moneySavingStore from '../../stores/money-saving-store';
import limitsStore from '../../stores/limits-store';
import Constants from '../../../../config/events';
import {Button, Input, Alert} from 'react-bootstrap';
import Table from '../generics/table';
import AuthButton from '../generics/auth-button';

const defaultValue = 10;

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            authorization: true,
            suggestions: null,
            savings: defaultValue
        };
        this._changeField = this._changeField.bind(this);
        this._getSavingsSuggestion = this._getSavingsSuggestion.bind(this);
        this._updateLimitSuggestion = this._updateLimitSuggestion.bind(this);
        this._onAlertDismiss = this._onAlertDismiss.bind(this);
        this._submitNewLimits = this._submitNewLimits.bind(this);
        this._onSave = this._onSave.bind(this);
        this._authorizationError = this._authorizationError.bind(this);
    }

    componentDidMount() {
        generalActions.update(Constants.PAGE_SAVINGS);
    }

    componentWillMount() {
        moneySavingStore.addChangeListener(this._updateLimitSuggestion);
        moneySavingStore.addErrorListener(this._authorizationError);
        limitsStore.addSaveListener(this._onSave);
    }

    componentWillUnmount() {
        moneySavingStore.removeChangeListener(this._updateLimitSuggestion);
        moneySavingStore.removeErrorListener(this._authorizationError);
        limitsStore.removeSaveListener(this._onSave);
    }

    _authorizationError() {
        this.setState({
            authorization: false
        })
    }

    _onSave(success) {
        this.setState({
            formSending: false,
            bsStyle: success ? 'success' : 'danger',
            message: success ? 'Form saved successfully' : 'Problem occurred while saving form',
            showMessage: true
        });
    }

    _changeField(e) {
        var nextState = {};
        nextState[e.target.name] = +e.target.value;
        this.setState(nextState);
    }

    _updateLimitSuggestion() {
        const suggestionsData = moneySavingStore.getState();
        const limitsData = limitsStore.getState();

        let suggestions = [
            {
                label: 'litres per stream limit',
                val2: `${suggestionsData.streamLimit} ${limitsData.units}`
            },
            {
                label: 'limit crossed warning level',
                val2: `${suggestionsData.streamLimitCrossed} times`
            },
            {
                label: 'daily usage limit',
                val2: `${suggestionsData.dailyUsage} ${limitsData.units}`
            }
        ];

        this.setState({suggestions, suggestionsData, authorization: true});
    }

    _getSavingsSuggestion() {
        moneySaveAction.update(this.state.savings);
    }

    _submitNewLimits() {
        limitsSetAction.update(this.state.suggestionsData);
    }

    _onAlertDismiss() {
        this.setState({showMessage: false})
    }

    render() {
        let suggestionTableTitle = `Suggestions for ${this.state.savings}% level savings`;
        let message = (<Alert
            className='none'
            bsStyle={this.state.bsStyle}
            onDismiss={this._onAlertDismiss}
        ><strong>{this.state.message}</strong></Alert>);

        return (
            <div>
                <Header subtitle="extras" title="Savings analysis"/>
                {this.state.showMessage && message}
                <Input
                    type="select"
                    label="Your monthly savings"
                    value={this.state.savings}
                    ref="savings"
                    name="savings"
                    onChange={this._changeField}
                >
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                    <option value="25">25%</option>
                    <option value="30">30%</option>
                </Input>

                <Button bsStyle='primary' onClick={this._getSavingsSuggestion}>get suggestions</Button>

                {!this.state.authorization &&
                    <div className="authorization-btn-container">
                        <AuthButton />
                    </div>}

                { this.state.suggestions &&
                <div>
                    <Header title={suggestionTableTitle}/>
                    <Table items={this.state.suggestions}/>
                    <Button
                        bsStyle='primary' onClick={this._submitNewLimits} >
                        apply
                    </Button></div> }

                <Header subtitle="other" title="Page info"/>
                <Jumbotron text="Estimate amount that you want to save - based on your habits and historical
        data we will advice you what limits should you assign. Then dashboard alerts and led indicator at
        your sink will lead you to your savings goals."/>
            </div>
        );
    }
}
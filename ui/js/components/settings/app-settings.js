import React from 'react';
import {debounce} from 'lodash';
import Header from '../generics/page-header';
import Jumbotron from '../generics/jumbotron';
import {generalActions, limitsGetAction, limitsSetAction} from '../../actions/app-actions';
import {PAGE_SETTINGS} from '../../../../config/events';
import {Grid, Row, Col, Button, Input, Alert} from 'react-bootstrap';
import limitsStore from '../../stores/limits-store';

export default class extends React.Component {
    constructor() {
        super();
        this.state = limitsStore.getState();
        this._updateLimits = this._updateLimits.bind(this);
        this._onSave = debounce(this._onSave.bind(this));
        this._changeField = this._changeField.bind(this);
    }

    _updateLimits() {
        this.setState(limitsStore.getState());
    }

    _onSave(success) {
        this.setState({
            formSending: false,
            bsStyle: success ? 'success' : 'danger',
            message: success ? 'Form saved successfully' : 'Problem occurred while saving form',
            showMessage: true
        });

        limitsGetAction.update();
    }

    _onAlertDismiss() {
        this.setState({showMessage: false})
    }

    componentDidMount() {
        generalActions.update(PAGE_SETTINGS);
        limitsGetAction.update();
    }

    componentWillMount() {
        limitsStore.addChangeListener(this._updateLimits);
        limitsStore.addSaveListener(this._onSave);
    }

    componentWillUnmount() {
        limitsStore.removeChangeListener(this._updateLimits);
        limitsStore.removeSaveListener(this._onSave);
    }

    submitLimitForm() {
        var limits = {
            streamLimit: 0,
            streamOpenTime: 0,
            streamLimitCrossed: 0,
            dailyUsage: 0
        };
        for (let i of Object.keys(limits)) {
            limits[i] = this.refs[i].getValue();
        };
        limitsSetAction.update(limits);
        this.setState({formSending: true});
    }

    submitAppSettings() {
        limitsSetAction.update({units: this.refs.units.getValue()})
    }

    _changeField(e) {
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        let message = (<Alert
            className='none'
            bsStyle={this.state.bsStyle}
            onDismiss={this._onAlertDismiss.bind(this)}
            ><strong>{this.state.message}</strong></Alert>);

        return (
            <div>
                <Header subtitle='limits' title='Water usage'/>
                {this.state.showMessage && message}

                <Grid id='settingsLimits'>
                    <Row>
                        <Col md={3}>
                            <Input
                                ref='streamLimit'
                                name='streamLimit'
                                label='Stream Limit'
                                bsSize='small'
                                type='text'
                                addonAfter={this.state.units}
                                value={this.state.streamLimit}
                                onChange={this._changeField}
                            />
                        </Col>
                        <Col md={8} className="yellow">after crossing this limit yellow led will light up and you will see
                            apropriate badge indashboard</Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <Input
                                ref='streamOpenTime'
                                label='Limit for water stream open time'
                                bsSize='small'
                                type='text'
                                addonAfter='seconds'
                                defaultValue={this.state.streamOpenTime}
                            />
                        </Col>
                        <Col md={8} className="yellow">after crossing this limit yellow led will light up and you
                            will see apropriate badge in dashboard</Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <Input
                                ref='streamLimitCrossed'
                                label='Stream crossed limit warning'
                                bsSize='small'
                                type='text'
                                addonAfter='times'
                                defaultValue={this.state.streamLimitCrossed}
                            />
                        </Col>
                        <Col md={8}></Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <Input
                                ref='dailyUsage'
                                name='dailyUsage'
                                label='Daily usage limit'
                                bsSize='small'
                                type='text'
                                addonAfter={this.state.units}
                                value={this.state.dailyUsage}
                                onChange={this._changeField}
                            />
                        </Col>
                        <Col md={8} className="red">after crossing this limit red led will light up</Col>
                    </Row>

                </Grid>
                <Jumbotron className="green" text="If no limits are crossed, green led will be light up" />
                <Button
                    disabled={this.state.formSending}
                    bsStyle='primary'
                    onClick={this.submitLimitForm.bind(this)}>
                    apply
                </Button>

                <Header subtitle='settings' title='Application settings'/>
                <Input
                    ref="units"
                    name="units"
                    type="select"
                    label="Units"
                    value={this.state.units}
                    onChange={this._changeField}
                >
                    <option value="litres">Litres</option>
                    <option value="gallons">Gallons</option>
                </Input>
                <Button
                    disabled={this.state.formSending}
                    bsStyle='primary'
                    onClick={this.submitAppSettings.bind(this)}>
                    apply
                </Button>

                <Header subtitle='other' title='Page info'/>
                <Jumbotron text='Here you can set all the limits and warning levels to save water money and earth!'/>
            </div>
        );

    }
}
import React from 'react';
import Header from '../generics/page-header';
import Label from '../generics/warning-label';
import {hotAlertStore, coldAlertStore} from '../../stores/alert-store';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this._updateState = this._updateState.bind(this);
    }

    componentWillMount() {
        hotAlertStore.addChangeListener(this._updateState);
        coldAlertStore.addChangeListener(this._updateState);
        this._updateState();
    }

    componentWillUnmount() {
        hotAlertStore.removeChangeListener(this._updateState);
        coldAlertStore.removeChangeListener(this._updateState);
    }

    _updateState() {
        let hotAlertData = hotAlertStore.getState();
        let coldAlertData = coldAlertStore.getState();
        this.setState({hotAlertData, coldAlertData});
    }

    render() {
        let coldWaterWarning = this.state.coldAlertData.dailyUsage ? <Label big="true" type="success" txt="status ok"/>
            :  <Label big="true" type="warning" txt="limit water stream"/>;
        let hotWaterWarning = this.state.hotAlertData.dailyUsage ? <Label big="true" type="success" txt="status ok"/>
            :  <Label big="true" type="warning" txt="limit water stream"/>;


        return (
            <div>
                <Header subtitle="alert status" title=""/>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            {coldWaterWarning}
                        </div>
                        <div className="col-md-6">
                            {hotWaterWarning}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
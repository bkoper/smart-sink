import React from 'react';
import Header from '../generics/page-header';
import SpeedChart from '../generics/circle-chart';
import {hotSensorStore, coldSensorStore} from '../../stores/sensor-stores';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this._updateHotSensorView = this._updateHotSensorView.bind(this);
        this._updateColdSensorView = this._updateColdSensorView.bind(this);
    }

    componentWillMount() {
        hotSensorStore.addChangeListener(this._updateHotSensorView);
        coldSensorStore.addChangeListener(this._updateColdSensorView);
        this._updateHotSensorView();
        this._updateColdSensorView();
    }

    componentWillUnmount() {
        hotSensorStore.removeChangeListener(this._updateHotSensorView);
        coldSensorStore.removeChangeListener(this._updateColdSensorView);
    }

    _updateHotSensorView() {
        this.setState({
            hotSensorData: hotSensorStore.getState()
        })
    }

    _updateColdSensorView() {
        this.setState({
            coldSensorData: coldSensorStore.getState()
        })
    }

    render() {
        return (
            <div>
                <Header subtitle="dashboard" title="Live overview"/>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <SpeedChart
                                percent={this.state.coldSensorData.speedPercent}
                                speed={this.state.coldSensorData.currentSpeed}
                                label="Cold water"
                                type="cold"/>
                        </div>
                        <div className="col-md-6">
                            <SpeedChart
                                percent={this.state.hotSensorData.speedPercent}
                                speed={this.state.hotSensorData.currentSpeed}
                                label="Hot water"
                                type="hot"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
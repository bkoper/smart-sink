import React from 'react';
import Table from '../generics/table';
import Header from '../generics/page-header';
import {hotSensorStore, coldSensorStore} from '../../stores/sensor-stores';
import {hotAlertStore, coldAlertStore} from '../../stores/alert-store';
import settings from '../../stores/limits-store';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this._updateTable = this._updateTable.bind(this);
    }

    componentWillMount() {
        hotSensorStore.addChangeListener(this._updateTable);
        coldSensorStore.addChangeListener(this._updateTable);
        hotAlertStore.addChangeListener(this._updateTable);
        coldAlertStore.addChangeListener(this._updateTable);
        this._updateTable();
    }

    componentWillUnmount() {
        hotSensorStore.removeChangeListener(this._updateTable);
        coldSensorStore.removeChangeListener(this._updateTable);
        hotAlertStore.removeChangeListener(this._updateTable);
        coldAlertStore.removeChangeListener(this._updateTable);
    }

    _updateTable() {
        let hotSensorData = hotSensorStore.getState();
        let coldSensorData = coldSensorStore.getState();
        let hotAlertData = hotAlertStore.getState();
        let coldAlertData = coldAlertStore.getState();
        let settingsData = settings.getState();

        let itemList = [
            {
                label: "water flown since last open",
                val1: `${coldSensorData.currentWaterFlown} ${settingsData.units}`,
                val2: `${hotSensorData.currentWaterFlown} ${settingsData.units}`,
                val1Info: coldAlertData.limitPerStream && "warning",
                val2Info: hotAlertData.limitPerStream && "warning"
            },
            {
                label: "'max-usage-per-opening' crossed times",
                val1: `${coldSensorData.limitCrossedTimes} times`,
                val2: `${hotSensorData.limitCrossedTimes} times`,
                val1Info: coldAlertData.limitCrossedWarning && "warning",
                val2Info: hotAlertData.limitCrossedWarning && "warning"
            },
            {
                label:"average per usage",
                val1: `${coldSensorData.avg} ml/min`,
                val2: `${hotSensorData.avg} ml/min`
            },
            {
                label: "since last opening",
                val1: `${coldSensorData.streamOpenTime} s`,
                val2: `${hotSensorData.streamOpenTime} s`,
                val1Info: coldAlertData.openTime && "warning",
                val2Info: hotAlertData.openTime && "warning"
            },
            {
                label: "longest stream",
                val1: `${coldSensorData.longestOpenedMinutes} s`,
                val2: `${hotSensorData.longestOpenedMinutes} s`
            },
            {
                label: "today's total",
                val1: `${coldSensorData.total} ${settingsData.units}`,
                val2: `${hotSensorData.total} ${settingsData.units}`,
                val1Info: coldAlertData.dailyUsage && "danger",
                val2Info: hotAlertData.dailyUsage && "danger"
            }
        ];

        this.setState({itemList})
    }


    render() {
        return (
            <div>
                <Header subtitle="live status" title="Today's summary"/>
                <Table items={this.state.itemList} />
            </div>
        )
    }
}
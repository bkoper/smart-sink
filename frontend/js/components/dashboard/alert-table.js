import React from 'react';
import Table from '../generics/table';
import Header from '../generics/page-header';
import {hotSensorStore, coldSensorStore} from '../../stores/sensor-stores';
import {hotAlertStore, coldAlertStore} from '../../stores/alert-store';

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

    _updateState(newData) {
        this.setState(newData, () => this._updateTable() );
    }

    _updateTable() {
        let hotSensorData = hotSensorStore.getState();
        let coldSensorData = coldSensorStore.getState();
        let hotAlertDate = hotAlertStore.getState();
        let coldAlertDate = coldAlertStore.getState();
        let tempItemList = [
            {
                label:"avg stream speed",
                val1: `${hotSensorData.avg}% (27 ml/min)`,
                val2: `${coldSensorData.avg}% (25 ml/min)`
            },
            {
                label: "max stream speed",
                val1: `${hotSensorData.max}%`,
                val2: `${coldSensorData.max}%`
            },
            {
                label: "stream limit crossed",
                val1: `${hotSensorData.limitCrossedTimes} times`,
                val2: `${coldSensorData.limitCrossedTimes} times`,
                val1Info: coldAlertDate.streamLimitCrossed && "warning",
                val2Info: hotAlertDate.streamLimitCrossed && "warning"
            },
            {
                label: "longest open stream",
                val1: `${coldAlertDate.longestOpenedMinutes}min`,
                val2: `${hotAlertDate.longestOpenedMinutes}min`
            },
            {
                label: "current daily usage",
                val1: `${hotSensorData.dailyUsage} litres`,
                val2: `${coldSensorData.dailyUsage} litres`,
                val1Info: coldAlertDate.dailyUsage && "danger",
                val2Info: hotAlertDate.dailyUsage && "danger"
            },
            {
                label: "daily limit",
                val1: "25 litres",
                val2: "26 litres"
            }

        ];

        this.setState({tempItemList})
    }


    render() {
        return (
            <div>
                <Header subtitle="live status" title="Summary table"/>
                <Table items={this.state.tempItemList} />
            </div>
        )
    }
}
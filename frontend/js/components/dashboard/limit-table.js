import React from 'react';
import Table from '../generics/table';
import Header from '../generics/page-header';
import limits from '../../stores/limits-store';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this._updateTable = this._updateTable.bind(this);
    }

    componentWillMount() {
        limits.addChangeListener(this._updateTable);
        this._updateTable();
    }

    componentWillUnmount() {
        limits.removeChangeListener(this._updateTable);
    }

    _updateTable() {
        let limitsData = limits.getState();
        let coldLimitsState = limitsData;
        let hotLimitsState = limitsData;

        let tableItems = [
            {
                label: 'litres per stream limit',
                val2: `${hotLimitsState.streamLimit} ${limitsData.units}`
            },
            {
                label: 'open time limit',
                val2: `${hotLimitsState.streamOpenTime} seconds`
            },
            {
                label: 'limit crossed warning level',
                val2: `${hotLimitsState.streamLimitCrossed} times`
            },
            {
                label: 'daily usage limit',
                val2: `${hotLimitsState.dailyUsage} ${limitsData.units}`
            }
        ];

        this.setState({tableItems});
    }

    render() {
        return (
            <div>
                <Header subtitle="Stream limits" title="Limits"/>
                <Table items={this.state.tableItems} />
            </div>
        )
    }
}
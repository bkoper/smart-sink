import React from 'react';
import Table from '../generics/table';
import dailyStore from '../../stores/daily-store';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this._updateTable = this._updateTable.bind(this);
    }

    componentWillMount() {
        dailyStore.addStatsChangeListener(this._updateTable);
        this._updateTable();
    }

    componentWillUnmount() {
        dailyStore.removeStatsChangeListener(this._updateTable);
    }

    _updateTable() {
        let data = dailyStore.getStats();

        let tableItems = [
            {
                label: 'sensors',
                val1: 'cold sensor',
                val2: 'hot sensor'
            },
            {
                label: 'daily average total',
                val1: `${(data && parseFloat(data[0][1].data.data[0].mean).toFixed(2)) || 0}`,
                val2: `${(data && parseFloat(data[0][1].data.data[0].mean).toFixed(2)) || 0}`
            },
            {
                label: 'numbers of streams',
                val1: `${(data && parseFloat(data[0][1].data.data[0].count).toFixed(2)) || 0}`,
                val2: `${(data && parseFloat(data[0][1].data.data[0].count).toFixed(2)) || 0}`
            },
            {
                label: 'average daily speed',
                val1: `${(data && parseFloat(data[1][0].data.data[0].mean).toFixed(2)) || 0}`,
                val2: `${(data && parseFloat(data[1][1].data.data[0].mean).toFixed(2)) || 0}`
            }
        ];

        this.setState({tableItems});
    }

    render() {
        return (<Table items={this.state.tableItems} />)
    }
}
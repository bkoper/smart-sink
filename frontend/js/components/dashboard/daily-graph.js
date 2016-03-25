import React from 'react';
import dailyStore from '../../stores/daily-store';
import _ from 'lodash';
import LineChart from '../generics/line-chart';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this._updateView = this._updateView.bind(this);
        let chartData = {
            labels: [
                "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12am",
                "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12pm"],
            datasets: []
        };

        this.state = {chartData};
    }

    componentWillMount() {
        dailyStore.addDailyChangeListener(this._updateView);
    }

    componentWillUnmount() {
        dailyStore.removeDailyChangeListener(this._updateView);
    }

    _updateView() {
        let dailyStatus = dailyStore.getDailyStatus();
        let chartData = this.state.chartData;
        chartData.datasets = dailyStatus;
        this.setState({chartData});
    }

    render() {
        return (
            <LineChart
                title="Today's water usage - total"
                subtitle="graph"
                data={this.state.chartData}
            />
        )
    }
};

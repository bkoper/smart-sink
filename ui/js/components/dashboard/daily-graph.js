import React from 'react';
import dailyStore from '../../stores/daily-store';
import LineChart from '../generics/line-chart';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this._updateView = this._updateView.bind(this);
        this._authorizationError = this._authorizationError.bind(this);
        const chartData = {
            labels: [
                "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12am",
                "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12pm"],
            datasets: []
        };

        this.state = {
            chartData,
            authorization: true //default
        };
    }

    componentWillMount() {
        dailyStore.addDailyChangeListener(this._updateView);
        dailyStore.addErrorListener(this._authorizationError);
    }

    componentWillUnmount() {
        dailyStore.removeDailyChangeListener(this._updateView);
        dailyStore.removeErrorListener(this._authorizationError);
    }

    _authorizationError() {
        this.setState({
            authorization: false
        })
    }

    _updateView() {
        const dailyStatus = dailyStore.getDailyStatus();
        const chartData = this.state.chartData;
        chartData.datasets = dailyStatus;
        this.setState({
            chartData,
            authorization: true
        });
    }

    render() {
        return (
            <LineChart
                title="Today's water usage - total"
                subtitle="graph"
                data={this.state.chartData}
                authorization={this.state.authorization}
            />
        )
    }
};

import React from 'react';
import Header from '../generics/page-header';
import CircleChart from '../generics/circle-chart';
import {hotSensorStore, coldSensorStore} from '../../stores/sensor-stores';
import {Col, Row, Carousel, CarouselItem} from 'react-bootstrap';
import limits from '../../stores/limits-store';
import _ from 'lodash';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this._updateHotSensorView = _.throttle(this._updateHotSensorView.bind(this), 1000);
        this._updateColdSensorView =  _.throttle(this._updateColdSensorView.bind(this), 1000);

        this.state = {
            index: 0
        };

        this.subtitle = [
            'current usage',
            'daily usage limit'
        ];
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
        this._updateHotSensorView.cancel();
        this._updateColdSensorView.cancel();
    }

    _updateHotSensorView() {
        let hotStore = hotSensorStore.getState();
        let limitsData = limits.getState();
        let dailyUsage = limitsData.dailyUsage;
        let limitPercent = Math.round((hotStore.total / dailyUsage) * 100);
        this.setState({
            hotSensorData: hotStore,
            hotDailyLimitPercent: limitPercent,
            hotDailyLimit: dailyUsage
        });
    }

    _updateColdSensorView() {
        let coldStore = coldSensorStore.getState();
        let limitsData = limits.getState();
        let dailyUsage = limitsData.dailyUsage;
        let limitPercent = Math.round((coldStore.total / dailyUsage) * 100);
        this.setState({
            coldSensorData: coldStore,
            coldDailyLimitPercent: limitPercent,
            coldDailyLimit: dailyUsage
        });
    }

    _onSelect(index, selectedDirection) {
        this.setState({index});
    }

    render() {
        let title = `Live overview / ${this.subtitle[this.state.index]}`;

        return (
            <div>
                <Header subtitle="dashboard" title={title}/>

                <Carousel activeIndex={this.state.index}
                          direction={null}
                          onSelect={this._onSelect.bind(this)}
                >
                    <CarouselItem>
                        <Row>
                            <Col md={6}>
                                <CircleChart
                                    percent={this.state.coldSensorData.percentSpeed}
                                    value2={`${this.state.coldSensorData.speed} ml/min`}
                                    label="Cold water"
                                    type="cold"/>
                            </Col>
                            <Col md={6}>
                                <CircleChart
                                    percent={this.state.hotSensorData.percentSpeed}
                                    value2={`${this.state.hotSensorData.speed} ml/min`}
                                    label="Hot water"
                                    type="hot"/>
                            </Col>
                        </Row>
                    </CarouselItem>

                    <CarouselItem>
                        <Row>
                            <Col md={6}>
                                <CircleChart
                                    percent={this.state.coldDailyLimitPercent}
                                    value2={`${this.state.coldDailyLimit}l daily limit`}
                                    label="Cold water"
                                    type="cold"/>
                            </Col>
                            <Col md={6}>
                                <CircleChart
                                    percent={this.state.hotDailyLimitPercent}
                                    value2={`${this.state.hotDailyLimit}l daily limit`}
                                    label="Hot water"
                                    type="hot"/>
                            </Col>
                        </Row>
                    </CarouselItem>
                </Carousel>
            </div>
        )
    }
}
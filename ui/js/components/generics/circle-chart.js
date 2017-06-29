import React from 'react';
import {Doughnut} from "react-chartjs";

const chartOptions = {
    scaleShowLabelBackdrop: false,

    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke: false,

    //String - The colour of each segment stroke
    segmentStrokeColor: "#fff",

    //Number - The width of each segment stroke
    segmentStrokeWidth: 0,

    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout: 70, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps: 10,

    //String - Animation easing effect, ex: easeOutBounce
    animationEasing: "easeOut",

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate: false,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale: false,

    chartSize: "200px"
};



export default props => {
    let percentDifference = props.percent > 100 ? 0 : 100 - props.percent;

    const color = props.type === "cold" ? "#2DA9DB" : "#E24A5C";
    const chartData = [
        {
            value: props.percent,
            color,
            label: props.label
        },
        {
            value: percentDifference,
            color: "#D4D4D4"
        }
    ];

    return (
        <div className="circle-chart">
            <div className="chart-center-label">
                <div className="value1">{props.percent}%</div>
                <div className="value2">{props.value2}</div>
            </div>
            <Doughnut
                width={chartOptions.chartSize}
                height={chartOptions.chartSize}
                data={chartData}
                options={chartOptions}
                redraw="true" />
            <div className="chart-label">{props.label}</div>
        </div>
    )
};


//<Doughnut
//    width={chartOptions.chartSize}
//    height={chartOptions.chartSize}
//    data={chartData}
//    options={chartOptions}
//    redraw />
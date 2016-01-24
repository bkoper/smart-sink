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

    const color = props.type === "cold" ? "#2DA9DB" : "#E24A5C";
    const speed = Math.round(props.speed);

    const chartData = [
        {
            value: props.percent,
            color,
            label: props.label
        },
        {
            value: 100 - props.percent,
            color: "#D4D4D4",
        }
    ];

    return (
        <div className="circle-chart">
            <div className="chart-center-label">
                <div className="percent">{props.percent}%</div>
                <div className="actualSpeed">{props.speed} ml/mi</div>
            </div>
            <Doughnut
                width={chartOptions.chartSize}
                height={chartOptions.chartSize}
                data={chartData}
                options={chartOptions}
                redraw />
            <div className="chart-label">{props.label}</div>
        </div>
    )
};
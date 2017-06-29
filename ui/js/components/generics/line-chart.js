import React from 'react';
import _ from 'lodash';
import {Line} from "react-chartjs";
import Header from '../generics/page-header';
import AuthButton from '../generics/auth-button';

let chartData = {
    labels: [],
    datasets: [
        {
            label: "My Second dataset",
            fillColor: "rgba(226,74,92,0.2)",
            strokeColor: "rgba(226,74,92,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(226,74,92,1)",
            data: [0]
        },
        {
            label: "My First dataset",
            fillColor: "rgba(45,169,219,0.2)",
            strokeColor: "rgba(45,169,219,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(45,169,219,1)",
            data: [10]
        }
    ]
};

let options = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,

    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth: 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve: true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension: 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot: true,

    //Number - Radius of each point dot in pixels
    pointDotRadius: 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth: 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius: 24,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke: true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth: 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill: true,

    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (let i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};

export default props => {
    let data = _.cloneDeep(chartData);
    _.merge(data, props.data);

    return (
        <div>
            <Header subtitle="graph" title={props.title} />
            {props.authorization ?
                <Line className="dailyGraph" redraw="true" data={data} options={options}/> :
                <AuthButton />}
        </div>
    );
}
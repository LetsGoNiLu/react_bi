import React from 'react';
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
class ChartComponent extends React.Component {
    constructor(props) {
        super(props)
        // Set initial state 
        console.log("==========>>",this.props.chartData);
        this.state = {
            data: {
                "labels": this.props.chartData.x,
                "datasets": [{
                    "data": this.props.chartData.y,
                    "label": "rain fall",
                    "backgroundColor": "blue",
                    "borderColor": "black",
                    "borderWidth":2
                }]
            }
        }

    }

    render() {
        const options = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Bar Chart',
              },
            },
          };
        return (

            <>
                <Bar options={options} data={this.state.data} />
            </>
        )
    }
}
export default ChartComponent;


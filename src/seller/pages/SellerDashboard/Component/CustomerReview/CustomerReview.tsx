import React from 'react'
import './CustomerReview.css';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const CustomerReview = () => {
    const options: ApexOptions = {
        series: [
            {
              name: "Review",
              data: [10, 50, 30, 90, 40, 120, 100],
            },
        ],
        chart: {
            type: "area",
            height: "auto",
            toolbar:{
                show: false
              }
        },
        fill: {
            colors: ["#fff"],
            type: "gradient",
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            colors: ["#ff929f"],
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm",
            },
        },
        grid: {
            show: false,
        },
        xaxis: {
            type: "datetime",
            categories: [
                "2018-09-19T00:00:00.000Z",
                "2018-09-19T01:30:00.000Z",
                "2018-09-19T02:30:00.000Z",
                "2018-09-19T03:30:00.000Z",
                "2018-09-19T04:30:00.000Z",
                "2018-09-19T05:30:00.000Z",
                "2018-09-19T06:30:00.000Z",
            ],
        },
        yaxis:{
            show:false
        },
    };
  return (
    <div className='CustomerReview'>
        <Chart series={options.series} options={options}/>
    </div>
  )
}

export default CustomerReview
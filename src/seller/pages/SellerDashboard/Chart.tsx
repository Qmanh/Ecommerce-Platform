import React from 'react'
import {Line} from 'react-chartjs-2';
import{Chart as ChartJs, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend} from 'chart.js';
import { callback } from 'chart.js/dist/helpers/helpers.core';

ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
)
const Chart = () => {
    const data = {
        labels: ["May 12","May 13","May 14","May 15","May 16", "May 17","May 18"],
        datasets:[{
            data:[8, 7.8, 6, 8, 7, 5, 6],
            backgroundColor: 'transparent',
            borderColor: '#f26c6d',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
            tension: 0.5,
        }]
    };

    const options = {
        plugins: {
            legend: {
              display: false
            }
          },
        scales: {
            x:{
                grid:{
                    display:false
                }
            },
            y: {
                border: {
                    dash: [5, 5],
                    display: true
                } ,

                min: 2,
                max: 10,
                ticks: {
                    stepSize: 2,
                    callback: (value:any) => value + 'K'
                },
                
          }
        }
      };

    
  return (
    <div style={{width:'500px', height:'500px', marginLeft:'20px'}}>
        <Line data={data} options={options}></Line>
    </div>
  )
}

export default Chart
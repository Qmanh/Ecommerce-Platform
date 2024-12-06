import React, { useState } from 'react'
import './CustomCard.css';
import { formatCurrency } from '../../../../../Utils/CustomCurrencyVND';
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import { ClearOutlined } from '@mui/icons-material';
import Chart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";
import { motion } from 'framer-motion';



const Card = (props: any) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            {expanded ? 
                <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
             : 
                <CompactCard param={props} setExpanded={() => setExpanded(true)} />
            }
        </>
    )
}
const CompactCard = ({ param, setExpanded }: any) => {
    const Png = param.png;
    return (
        <div
            className="CompactCard"
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow,
            }}
            onClick={setExpanded}
        >
            <div className="radialBar">
                <CircularProgressbar
                    value={param.barValue}
                    text={`${param.barValue}%`}
                />
                <span>{param.title}</span>
            </div>
            <div className="detail">
                <Png />
                <span>{param.title==="Sales" ? ` ${formatCurrency(param.value)}`: param.value}</span>
                <span>{param.title==="Sales" ? `${formatCurrency(param.total)}`: ""}</span>
                
                
                <span>Last 24 hours</span>
            </div>
        </div>
    );
}

//ExpandedCard
const ExpandedCard = ({ param, setExpanded }: any) => {

    const options: ApexOptions = {
        chart: {
            type: "area",
            height: "auto",
            dropShadow: {
                enabled: true,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.5,
                color: 'yellow'
            },
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
            colors: ["white"],
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm",
            },
        },
        grid: {
            show: true,
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
    };
    return (
        <div
            className="ExpandedCard"
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow,
            }}
            
        >
            <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
                <ClearOutlined onClick={setExpanded}/>
            </div>
            <span>{param.title}</span>
            <div className="chartContainer">
                <Chart options={options} series={param.series} type="area" />
            </div>
            <span>Last 24 hours</span>
        </div>
    );

}

export default Card
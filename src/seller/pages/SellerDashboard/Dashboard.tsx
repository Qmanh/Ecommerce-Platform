import React from 'react'
import { formatCurrency } from '../../../Utils/CustomCurrencyVND';
import "../../../App.css";
import Sidebar from './Component/Sidebar';
import MainDash from './Component/MainDash';
import RightSide from './Component/RightSide/RightSide';


const Dashboard = () => {

  return (
    <>
      <div className='MainDash'>
          <MainDash/>
      </div>
      
    </>
  )
}

export default Dashboard
import React from 'react'
import './MainDash.css'
import Cards from './Cards'
import OrderTable from '../../Orders/OrderTable'


const MainDash = () => {
  return (
    <div className='MainDash'>
        <h1>Dashboard</h1>
        <Cards/>
        
        <OrderTable/>
    </div>
  )
}

export default MainDash
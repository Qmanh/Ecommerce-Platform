import React from 'react'
import './MainDash.css'
import Cards from './Cards'
import OrderTable from '../../Orders/OrderTable'
import SellerRoutes from '../../../../Routes/SellerRoutes'


const MainDash = () => {
  return (
    <div>
      <div>
        <Cards/>
      </div>
      <div className='mt-[1rem]'>
        <OrderTable/>
      </div>
      
    
    </div>
  )
}

export default MainDash
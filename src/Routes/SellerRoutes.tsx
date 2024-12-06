import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Dashboard from '../seller/pages/SellerDashboard/Dashboard'
import AddProduct from '../seller/pages/Products/UpdateProduct'
import Orders from '../seller/pages/Orders/Orders'
import Profile from '../seller/pages/Account/Profile'
import Payment from '../seller/pages/Payment/Payment'
import Transaction from '../seller/pages/Payment/Transaction'
import Products from '../seller/pages/Products/Products'
import Dashboard from '../seller/pages/SellerDashboard/Dashboard'

const SellerRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path = '/' element={<Dashboard/>}/>
            <Route path = '/products' element={<Products/>}/>
            <Route path = '/add-products' element={<AddProduct onClose={""} data={""}/>}/>
            <Route path = '/orders' element={<Orders/>}/>
            <Route path = '/account' element={<Profile/>}/>
            <Route path = '/payment' element={<Payment/>}/>
            <Route path = '/transaction' element={<Transaction/>}/>
        </Routes>
    </div>
  )
}

export default SellerRoutes
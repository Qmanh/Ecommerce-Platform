import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import SellersTable from '../admin/Pages/Seller/SellersTable'
import Coupon from '../admin/Pages/Coupon/Coupon'
import AddNewCouponForm from '../admin/Pages/Coupon/AddNewCouponForm'
import GridTable from '../admin/Pages/HomePage/GridTable'
import ElectronicTable from '../admin/Pages/HomePage/ElectronicTable'
import ShopByCategoryTable from '../admin/Pages/HomePage/ShopByCategoryTable'
import Deal from '../admin/Pages/HomePage/Deal'
import { useAppDispatch, useAppSelector } from '../State/Store'
import { getAllCoupons } from '../State/admin/adminCouponSlice'
import Size from '../admin/Pages/HomePage/Size'
import Category from '../admin/Pages/HomePage/CategoryFolder/Category'
import AccountAdmin from '../admin/Pages/Seller/AccountAdmin'



const AdminRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<AccountAdmin/>}/>
            <Route path='/coupon' element={<Coupon/>}/>
            {/* <Route path='/add-coupon' element={<AddNewCouponForm/>}/> */}
            {/* <Route path='/home-grid' element={<GridTable/>}/> */}
            <Route path='/category' element={<Category/>}/>
            <Route path='/electronics-category' element={<ElectronicTable/>}/>
            <Route path='/shop-by-category' element={<ShopByCategoryTable/>}/>
            <Route path='/deals' element={<Deal/>}/>
            <Route path='/sizes' element={<Size/>}/>
        </Routes>
    </div>
  )
}

export default AdminRoutes
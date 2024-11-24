import React, { useEffect } from 'react'
import AdminDrawerList from '../../component/AdminDrawerList'
import AdminRoutes from '../../../Routes/AdminRoutes'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { fetchHomeCategories } from '../../../State/admin/adminSlice'
import { fetchUserProfile } from '../../../State/AuthSlice'
import { getAllCoupons } from '../../../State/admin/adminCouponSlice'

const AdminDashboard = () => {
    const toggleDrawer = () =>{}
    
  return (
    <div>
        <div className='lg:flex lg:h-[90vh]'>
            <section className='hidden lg:block h-full'>
                <AdminDrawerList toggleDrawer={toggleDrawer}/>
            </section>

            <section className='p-10 w-full lg:w-[80%] overflow-y-auto'>
                <AdminRoutes/>
            </section>
        </div>
    </div>
  )
}

export default AdminDashboard
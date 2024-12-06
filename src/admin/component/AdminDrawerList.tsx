import React, { useEffect } from 'react'
import { AccountBox, Add, Category, Dashboard, ElectricBolt, Home, IntegrationInstructions, LocalOffer, Logout, Straight, Straighten } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../State/Store'
import { getAllCoupons } from '../../State/admin/adminCouponSlice'
import AdminToDrawerList from '../../component/AdminToDrawerList'

const menu = [
  {
    name:"Dashboard",
    path:"/admin",
    icon:<Dashboard className='text-primary-color'/>,
    activeIcon: <Dashboard className='text-white'/>
  },
  {
    name:"Coupons",
    path:"/admin/coupon",
    icon:<IntegrationInstructions className='text-primary-color'/>,
    activeIcon: <IntegrationInstructions className='text-white'/>
  },
  // {
  //   name:"Add New Coupon",
  //   path:"/admin/add-coupon",
  //   icon:<Add className='text-primary-color'/>,
  //   activeIcon: <Add className='text-white'/>
  // },
  {
    name:"Category",
    path:"/admin/category",
    icon:<Home className='text-primary-color'/>,
    activeIcon: <Home className='text-white'/>
  },
  {
    name:"Electronics Category",
    path:"/admin/electronics-category",
    icon:<ElectricBolt className='text-primary-color'/>,
    activeIcon: <ElectricBolt className='text-white'/>
  },
  {
    name:"Shop By Category",
    path:"/admin/shop-by-category",
    icon:<Category className='text-primary-color'/>,
    activeIcon: <Category className='text-white'/>
  },
  {
    name:"Deals",
    path:"/admin/deals",
    icon:<LocalOffer className='text-primary-color'/>,
    activeIcon: <LocalOffer className='text-white'/>
  },
  {
    name:"Add Size",
    path:"/admin/sizes",
    icon:<Straighten className='text-primary-color'/>,
    activeIcon: <Straighten className='text-white'/>
  },
]

const menu2 = [
  // {
  //   name:"Account",
  //   path:"/admin/account",
  //   icon:<AccountBox className='text-primary-color'/>,
  //   activeIcon: <AccountBox className='text-white'/>
  // },
  {
    name:"Logout",
    path:"/",
    icon:<Logout className='text-primary-color'/>,
    activeIcon: <Logout className='text-white'/>
  },
]

const AdminDrawerList = ({toggleDrawer}:any) => {
  
  return (
    <AdminToDrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer}/>
  )
}

export default AdminDrawerList
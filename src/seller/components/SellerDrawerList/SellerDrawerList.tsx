import { AccountBalance, AccountBox, Add, Dashboard, Inventory, Logout, Receipt, ShoppingBag } from '@mui/icons-material'
import React from 'react'
import DrawerList from '../../../component/DrawerList';

const menu = [
    {
        name:"Dashboard",
        path:"/seller",
        icon: <Dashboard className='text-primary-color'/>,
        activeIcon: <Dashboard className='text-white'/>
    },
    {
        name:"Orders",
        path:"/seller/orders",
        icon: <ShoppingBag className='text-primary-color'/>,
        activeIcon: <ShoppingBag className='text-white'/>
    },
    {
        name:"Products",
        path:"/seller/products",
        icon: <Inventory className='text-primary-color'/>,
        activeIcon: <Inventory className='text-white'/>
    },
    {
        name:"Add Product",
        path:"/seller/add-products",
        icon: <Add className='text-primary-color'/>,
        activeIcon: <Add className='text-white'/>
    },
    {
        name:"Payment",
        path:"/seller/payment",
        icon: <AccountBalance className='text-primary-color'/>,
        activeIcon: <AccountBalance className='text-white'/>
    },
    {
        name:"Transaction",
        path:"/seller/transaction",
        icon: <Receipt className='text-primary-color'/>,
        activeIcon: <Receipt className='text-white'/>
    },
];

const menu2 = [
    {
        name:"Account",
        path:"/seller/account",
        icon: <AccountBox className='text-primary-color'/>,
        activeIcon: <AccountBox className='text-white'/>
    },
    {
        name:"Logout",
        path:"/",
        icon: <Logout className='text-primary-color'/>,
        activeIcon: <Logout className='text-white'/>
    },
]


const SellerDrawerList = ({toggleDrawer}:{toggleDrawer:any}) => {
  return (
    <div className='h-full'>
        <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer}/>
    </div>
  )
}

export default SellerDrawerList
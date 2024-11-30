import { AccountBalance, AccountBox, Add, Dashboard, Inventory, Logout, Receipt, ShoppingBag } from '@mui/icons-material'
import React from 'react'
import DrawerList from '../../../component/DrawerList';

const menu = [
    {
        name:"Dashboard",
        path:"/seller",
        icon: Dashboard,
    },
    {
        name:"Orders",
        path:"/seller/orders",
        icon: ShoppingBag,
    },
    {
        name:"Products",
        path:"/seller/products",
        icon: Inventory
    },
    {
        name:"Payment",
        path:"/seller/payment",
        icon: AccountBalance
    },
    {
        name:"Transaction",
        path:"/seller/transaction",
        icon: Receipt
    },
    {
        name:"Account",
        path:"/seller/account",
        icon: AccountBox,
    },
    {
        name:"Logout",
        path:"/",
        icon: Logout
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
    <div className='h-full w-full'>
        <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer}/>
    </div>
  )
}

export default SellerDrawerList
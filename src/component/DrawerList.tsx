import { Divider, ListItemIcon, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../State/Store'
import { logout } from '../State/AuthSlice'
import { getAllCoupons } from '../State/admin/adminCouponSlice'
import { motion } from 'framer-motion'
import { sidebarData } from '../data/sidebarData'
import '../seller/pages/SellerDashboard/Component/Sidebar.css';
import { ReorderOutlined } from '@mui/icons-material'
import Logo from '../imgs/logo.png';

interface menuItem {

    path: string,
    icon: any,
    name: any
}

interface DrawerListProps {
    menu: menuItem[],
    menu2: menuItem[],
    toggleDrawer: () => void
}

const sidebarVariants = {
    true: {
        left: '0'
    },
    false: {
        left: '-35%'
    }
}


const DrawerList = ({ menu, menu2, toggleDrawer }: DrawerListProps) => {
    const locaton = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true);

    const handleClick = (index: any, direction: any) => {
        if(direction ==="/"){
            dispatch(logout(navigate))
        }
        else{
            setSelected(index);
            navigate(direction);
        }
        
    }

    const handleLogout = () => {
        
    }

    return (
        //         <div className='h-full'>
        //             <div className='flex flex-col justify-between h-full w-[70px] border-r py-3'>
        //                     <div className='space-y-2'>
        //                         {
        //                             menu.map((item, index: number) =>
        //                                 <div onClick={() => navigate(item.path)} className='pr-3 cursor-pointer' key={index}>
        //                                     <p className={`${item.path == locaton.pathname ?
        //                                         "bg-primary-color text-white" :
        //                                         "text-primary-color"
        //                                         } flex items-center px-5 py-5 rounded-r-full`}>
        //                                         <ListItemIcon>
        //                                             {item.path == locaton.pathname?
        //                                              item.activeIcon: item.icon}
        //                                         </ListItemIcon>
        //                                     </p>
        //                                 </div>
        //                             )
        //                         }

        // <Divider/>
        //                     <div className='space-y-2'>
        //                         {
        //                             menu2.map((item, index: number) =>
        //                                 <div onClick={
        //                                     () => {
        //                                         navigate(item.path)
        //                                         if(item.path =="/") handleLogout()
        //                                     }
        //                                 } 
        //                                     className='pr-9 cursor-pointer' key={index}>
        //                                     <p className={`${item.path == locaton.pathname ?
        //                                         "bg-primary-color text-white" :
        //                                         "text-primary-color"
        //                                         } flex items-center px-5 py-3 rounded-r-full`}>
        //                                         <ListItemIcon>
        //                                             {item.path == locaton.pathname?
        //                                              item.activeIcon: item.icon}
        //                                         </ListItemIcon>

        //                                     </p>
        //                                 </div>
        //                             )
        //                         }
        //                     </div>
        //                 </div>

        //             </div>
        //         </div>

        <>
            <div className='bars' style={expanded ? { left: '35%' } : { left: '0%' }}
                onClick={() => setExpanded(!expanded)}
            >
                <ReorderOutlined />
            </div>
            <motion.div className='sidebar'
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? `${expanded}` : ''}
            >
                <div className='Logo'>
                    <img src={Logo} alt="" />
                    <span>
                        Sh<span>o</span>ps
                    </span>
                </div>

                <div className='h-full w-full'>
                    <div className='mt-[4rem] flex flex-col justify-between h-full  py-3'>
                        <div className='space-y-[2rem]'>
                            {menu.map((item, index) => {
                                return (
                                    <div
                                        className={selected === index ? 'menuItem active' : 'menuItem'}
                                        key={index}
                                        onClick={() => handleClick(index, item.path)}
                                    >
                                        <item.icon />
                                        <span>
                                            {item.name}
                                        </span>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </motion.div>
        </>

    )
}

export default DrawerList
import { Divider, ListItemIcon, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../State/Store'
import { logout } from '../State/AuthSlice'


interface menuItem {

    path: string,
    icon: any,
    name: any,
    activeIcon:any
}

interface DrawerListProps {
    menu: menuItem[],
    menu2: menuItem[],
    toggleDrawer: () => void
}




const AdminToDrawerList = ({ menu, menu2, toggleDrawer }: DrawerListProps) => {
    const locaton = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true);


    const handleLogout = () => {
        dispatch(logout(navigate))
    }

    return (
                <div className='h-full'>
                    <div className='flex flex-col justify-between h-full w-[300px] border-r py-3'>
                            <div className='space-y-2'>
                                {
                                    menu.map((item, index: number) =>
                                        <div onClick={() => navigate(item.path)} className='pr-3 cursor-pointer' key={index}>
                                            <p className={`${item.path == locaton.pathname ?
                                                "bg-primary-color text-white" :
                                                "text-primary-color"
                                                } flex items-center px-5 py-5 rounded-r-full`}>
                                                <ListItemIcon>
                                                    {item.path == locaton.pathname?
                                                     item.activeIcon: item.icon}
                                                </ListItemIcon>
                                                <span>{item.name}</span>
                                            </p>
                                        </div>
                                    )
                                }

        <Divider/>
                            <div className='space-y-2'>
                                {
                                    menu2.map((item, index: number) =>
                                        <div onClick={
                                            () => {
                                                navigate(item.path)
                                                if(item.path =="/") handleLogout()
                                            }
                                        } 
                                            className='pr-9 cursor-pointer' key={index}>
                                            <p className={`${item.path == locaton.pathname ?
                                                "bg-primary-color text-white" :
                                                "text-primary-color"
                                                } flex items-center px-5 py-3 rounded-r-full`}>
                                                <ListItemIcon>
                                                    {item.path == locaton.pathname?
                                                     item.activeIcon: item.icon}
                                                </ListItemIcon>
                                                <span>{item.name}</span>

                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                </div>


    )
}

export default AdminToDrawerList
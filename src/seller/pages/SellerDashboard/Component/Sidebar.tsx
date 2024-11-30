import React, { useState } from 'react'
import './Sidebar.css';
import Logo from '../../../../imgs/logo.png';
import { sidebarData } from '../../../../data/sidebarData';
import { LogoutOutlined, ReorderOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../State/Store';
import { logout } from '../../../../State/AuthSlice';

const Sidebar = () => {
    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout =() =>{
        dispatch(logout(navigate))
    }

    const sidebarVariants ={
        true: {
            left: '0'
        },
        false:{
            left:'-35%'
        }
    }

    const handleClick =(index:any,direction:any)=>{
        setSelected(index);
        navigate(direction);
    }


    return (
        <>
            <div className='bars' style={expanded ? { left: '35%' } : { left: '0%' }}
                onClick={()=> setExpanded(!expanded)}
            >
                <ReorderOutlined />
            </div>
            <motion.div className='sidebar'
                variants={sidebarVariants}
                animate = {window.innerWidth<=768?`${expanded}`:''}
            >
                <div className='Logo'>
                    <img src={Logo} alt="" />
                    <span>
                        Sh<span>o</span>ps
                    </span>
                </div>


                <div className='menu'>
                    {sidebarData.map((item, index) => {
                        return (
                            <div
                                className={selected === index ? 'menuItem active' : 'menuItem'}
                                key={index}
                                onClick={() => handleClick(index,item.path)}
                            >
                                <item.icon />
                                <span>
                                    {item.heading}
                                </span>
                            </div>
                        )
                    })}

                </div>
            </motion.div>
        </>

    )
}

export default Sidebar
import React, { useEffect, useState } from 'react'
import SellerAccountForm from './SellerAccountForm';
import SellerLoginForm from './SellerLoginForm';
import { Button } from '@mui/material';
import Toast from '../../../Theme/Toastify/Toast';
import { useNavigate } from 'react-router-dom';


const BecomeSeller = () => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const handleShowPage = () =>{
        setIsLogin(!isLogin);
    }    

    useEffect(() => {
        let isAuth = localStorage.getItem('jwt')|| "";
        if(isAuth && isAuth !== null) {
            navigate("/");
        }
    }, []);
  return (
    <div className='grid md:gap-10 grid-cols-3 min-h-screen'>
        <section className='lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md'>
            {
                !isLogin ? <SellerAccountForm/>
                : <SellerLoginForm/>
            }
            <div className='mt-10 space-y-2'>
                <h1 className='text-center text-sm font-medium'>
                    have account
                </h1>
                <Button onClick={handleShowPage} fullWidth sx={{py:"11px"}} variant='outlined'>
                    {isLogin ? "Register":"Login"}
                </Button>
            </div>
        </section>
        <section className='hidden md:col-span-1 lg:col-span-2 md:flex justify-center items-center'>
            <div className='lg:w-[70% px-5 space-y-10'>
                <div className='space-y-2 font-bold text-center'>
                    <p className='text-2xl'>Join the Marketplace Revolution</p>
                    <p className='text-primary-color text-lg'>Boost your sales today</p>
                </div>
                <img 
                    src="https://i.pinimg.com/564x/20/c5/d9/20c5d9202825a9931d4f3497c23edec3.jpg" 
                    alt="" />
            </div>

        </section>
    </div>
  )
}

export default BecomeSeller
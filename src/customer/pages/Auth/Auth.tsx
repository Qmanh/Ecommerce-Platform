import React, { useEffect, useState } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isAuth = localStorage.getItem('jwt')|| "";
    if(isAuth && isAuth !== null) {
        navigate("/");
    }
}, []);

  return (
    <div className='flex justify-center h-[90vh] items-center'>
      <div className='max-w-md h-[85vh] rounded-md shadow-lg'>
        <img
          className='w-full h-[200px] rounded-t-md' 
          src="https://i.pinimg.com/564x/f1/da/f9/f1daf9cb6f13469ea746eeb99cffbe85.jpg"
          alt="" />
        <div className='mt-4 px-10'>
          {isLogin ?  <LoginForm/> : <RegisterForm/>}

          <div className='flex items-center gap-1 justify-center mt-2'>
            <p>{isLogin && "Don't "}have Account</p>
            <Button className="top-0.5" size='small' onClick={()=>setIsLogin(!isLogin)}>
              {isLogin ? "Create Account":"Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
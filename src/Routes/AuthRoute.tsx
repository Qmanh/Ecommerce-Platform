import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../State/Store';
import { useEffect } from 'react';
import { fetchUserProfile } from '../State/AuthSlice';
import AdminDashboard from '../admin/Pages/Dashboard/AdminDashboard';
import Account from '../customer/pages/Account/Account';
import Home from '../customer/pages/Home/Home';


const AuthRoute = ({data}:{data:any}) => {
    const jwt = localStorage.getItem("jwt")
    
    if(localStorage.getItem("role")==="ROLE_ADMIN" || data.user?.role=="ROLE_ADMIN"){
        return <Outlet/>
    }else if(data.user?.role=="ROLE_CUSTOMER" || localStorage.getItem("role")==="ROLE_CUSTOMER"){
        return <Account/>
    }
    return <Navigate to="/" />
   
    
    
}

export default AuthRoute
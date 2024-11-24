import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@mui/material';
import Navbar from './customer/components/Navbar/Navbar';
import customeTheme from './Theme/customeTheme';

import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import BecomeSeller from './customer/pages/Become Seller/BecomeSeller';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import AdminDashboard from './admin/Pages/Dashboard/AdminDashboard';
import { fetchProduct } from './State/fetchProduct';
import { useAppDispatch, useAppSelector } from './State/Store';
import { fetchSellerProfile } from './State/seller/sellerSlice';
import Auth from './customer/pages/Auth/Auth';
import { AuthState, fetchUserAddress, fetchUserProfile } from './State/AuthSlice';
import PaymentSuccess from './customer/pages/PaymentSuccess';
import Wishlist from './customer/pages/Wishlist/Wishlist';
import { createHomeCategories } from './State/customer/CustomerSlice';
import { HomeCategories } from './data/HomeCategories';
import { AdminProtectedRoute } from './Utils/ProtectedRoute';
import AppRoutes from './Routes/AppRoutes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllCoupons } from './State/admin/adminCouponSlice';



function App() {
  const dispatch = useAppDispatch();
  const {seller, auth} = useAppSelector(store=>store);
  const navigate = useNavigate();
  
  // useEffect(()=>{
  //   dispatch(fetchSellerProfile(localStorage.getItem("jwt")))
  // },[localStorage.getItem("jwt")])
  // useEffect(()=>{
  //   if(seller.profile){
  //     navigate("/seller")
  //   }
  // },[seller.profile])

  // useEffect(()=>{
  //   if(auth.user?.role === "ROLE_ADMIN"){
  //     navigate("/admin")
  //   }else{
  //     navigate("/")
  //   }
  // },[auth.user?.role])
  useEffect(()=>{
    // dispatch(fetchUserProfile(localStorage.getItem("jwt")))
    // dispatch(fetchUserAddress(localStorage.getItem("jwt")))
    dispatch(createHomeCategories(HomeCategories))
  },[localStorage.getItem("jwt")])

  return (
 
    <>
    <ThemeProvider theme={customeTheme}>

      <div className="">
        <Navbar/>
        <AppRoutes/>
      </div>
      
    </ThemeProvider>
    <ToastContainer/>
</>
  );
}

export default App;

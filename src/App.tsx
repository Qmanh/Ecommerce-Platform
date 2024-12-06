import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import Navbar from './customer/components/Navbar/Navbar';
import customeTheme from './Theme/customeTheme';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './State/Store';

import { fetchHomePageData } from './State/customer/CustomerSlice';
import { HomeCategories } from './data/HomeCategories';
import AppRoutes from './Routes/AppRoutes';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchUserAddress, fetchUserProfile } from './State/AuthSlice';
import { getAllCategoriesCustomer, getAllCategoriesCustomer2, getAllCategoriesCustomer3 } from './State/admin/categorySlice';



function App() {
  const dispatch = useAppDispatch();
  const {seller, auth} = useAppSelector(store=>store);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(seller.profile){
      navigate("/seller")
    }
  },[seller.profile])

  useEffect(()=>{
    // dispatch(fetchUserProfile(localStorage.getItem("jwt")))
    // dispatch(fetchUserAddress(localStorage.getItem("jwt")))
    // dispatch(createHomeCategories(HomeCategories))
    dispatch(fetchHomePageData())
  },[])

  useEffect(()=>{
    dispatch(getAllCategoriesCustomer())
    dispatch(getAllCategoriesCustomer2())
    dispatch(getAllCategoriesCustomer3())
    
},[])

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

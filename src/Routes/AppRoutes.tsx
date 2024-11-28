
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../customer/pages/Home/Home'
import Auth from '../customer/pages/Auth/Auth'
import Product from '../customer/pages/Product/Product'
import Review from '../customer/pages/Review/Review'
import ProductDetails from '../customer/pages/Page Details/ProductDetails'
import Cart from '../customer/pages/Cart/Cart'
import Checkout from '../customer/pages/Checkout/Checkout'
import Wishlist from '../customer/pages/Wishlist/Wishlist'
import PaymentSuccess from '../customer/pages/PaymentSuccess'
import BecomeSeller from '../customer/pages/Become Seller/BecomeSeller'
import Account from '../customer/pages/Account/Account'
import { AdminProtectedRoute } from '../Utils/ProtectedRoute'
import AdminDashboard from '../admin/Pages/Dashboard/AdminDashboard'
import SellerDashboard from '../seller/pages/SellerDashboard/SellerDashboard'
import PrivateRoute from './PrivateRoute'
import { useAppDispatch, useAppSelector } from '../State/Store'
import AuthRoute from './AuthRoute'
import VerifySeller from '../customer/pages/Auth/VerifySeller'
import { fetchUserProfile } from '../State/AuthSlice'


const AppRoutes = () => {
    const { seller, auth } = useAppSelector(store => store)
    const dispatch = useAppDispatch();
    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/login' element={<Auth />} />
                <Route path='/products/:category' element={<Product />} />
                <Route path='/reviews/:productId' element={<Review />} />
                <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path='/payment-success/:orderId' element={<PaymentSuccess />} />
                <Route path='/become-seller' element={<BecomeSeller/>} />
                <Route path='/verify/:otp' element={<VerifySeller/>} />

                <Route path="/seller/*" element={
                    <PrivateRoute item={seller}>
                        <SellerDashboard/>
                    </PrivateRoute>}
                />

                <Route path="/admin/*" element={<AuthRoute data={auth}/>}>
                    <Route path='/admin/**' element={<AdminDashboard/>}/>
                </Route>

                <Route path="/account/*" element={<AuthRoute data={auth}/>}
                >
                    <Route path="/account/**" element={<Account/>}/>
                </Route>

            </Routes>
            
        </>
    )
}

export default AppRoutes
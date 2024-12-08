import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import sellerSlice from "./seller/sellerSlice"
import sellerProductSlice from "./seller/sellerProductSlice"
import productSlice from "./customer/ProductSlice"
import authSlice from "./AuthSlice"
import CartSlice from "./customer/CartSlice"
import OrderSlice from "./customer/OrderSlice"
import WishlistSlice from "./customer/WishlistSlice"
import sellerOrderSlice from "./seller/sellerOrderSlice"
import transactionSlice from "./seller/transactionSlice"
import homeCategorySlice from "./admin/adminSlice"
import homeSlice from "./customer/CustomerSlice"
import dealSlice from "./admin/dealSlice"
import adminCouponSlice from "./admin/adminCouponSlice"
import addressSlice from "./customer/AddressSlice"
import couponSlice from "./customer/CouponSlice"
import reviewSlice from "./customer/ReviewSlice"
import categorySlice from "./admin/categorySlice"

const rootReducer = combineReducers({
    seller:sellerSlice,
    sellerProduct:sellerProductSlice,
    product: productSlice,
    auth: authSlice,
    cart: CartSlice,
    order: OrderSlice,
    wishlist: WishlistSlice,
    customer:homeSlice,
    address: addressSlice,
    coupon: couponSlice,
    review: reviewSlice,
    
    //seller slice
    sellerOrder: sellerOrderSlice, 
    transactions: transactionSlice,

    //admin
    homeCategory: homeCategorySlice,
    deal: dealSlice,
    coupons: adminCouponSlice,
    category: categorySlice,
})
const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleWare)=> getDefaultMiddleWare().concat(thunk)
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
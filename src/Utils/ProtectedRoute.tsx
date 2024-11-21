import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../State/Store";
import { Seller } from "../types/SellerType";
import { AuthState, fetchUserProfile } from "../State/AuthSlice";



export const AdminProtectedRoute=({jwt}:{jwt:any})=>{
    const {auth} = useAppSelector(store=>store)
    console.log("admin item: ",auth.user?.role)
    const role = auth.user?.role
    return auth ?<Outlet/>: <Navigate to="/"/>
}

export const SellerProtectedRoute=({item}:{item:any})=>{
    // const role = localStorage.getItem("role");
    // console.log("seller item: ",item)
    // return item.seller > 0 ?<Outlet/>: <Navigate to="/"/>
    
}
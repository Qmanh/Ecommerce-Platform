import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../State/Store';
import { verifyEmail } from '../../../State/seller/sellerAuthSlice';
import { ToastItem } from 'react-toastify';
import BecomeSeller from '../Become Seller/BecomeSeller';
import Home from '../Home/Home';
import { fetchSellerProfile } from '../../../State/seller/sellerSlice';

const VerifySeller = () => {
    const otpPathVariable = useParams();
    console.log("otp: ",otpPathVariable.otp)
    const [otp, setOtp] = useState("");
    const [verify, setVerify] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        
        dispatch(verifyEmail(String(otpPathVariable.otp)))
            .then(() => {
                setOtp(String(otpPathVariable.otp));
                dispatch(fetchSellerProfile(localStorage.getItem("jwt")))
                setVerify(true);
            })
            .catch(()=>{
                setVerify(false);
            })
    }, [otpPathVariable]);
    
    
  return (
    <div>
       { !verify ? <Navigate to="/seller"/>: <Navigate to="/become-seller"/> }
    </div>
  )
}

export default VerifySeller
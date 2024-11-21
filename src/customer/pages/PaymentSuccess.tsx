import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../State/Store';
import { paymentSuccess } from '../../State/customer/OrderSlice';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {orderId} = useParams();
    const location = useLocation();
    const getQueryParam = (key:string)=>{
        const query = new URLSearchParams(location.search)
        return query.get(key)
    }
    const getPaymentIdFromUrl = () => {
        const urlParts = window.location.pathname.split('/');
        return urlParts[urlParts.length - 1];
    };

    useEffect(()=>{
        const vnp_amount = getQueryParam("vnp_Amount");
        const amount = getQueryParam("amount");
        const paymentId = getPaymentIdFromUrl();
        const vnp_CardType = getQueryParam("vnp_CardType");
        const vnp_PayDate = getQueryParam("vnp_PayDate");
        console.log("paymentId :", paymentId,"--- amount: ", amount)
        dispatch(paymentSuccess({jwt:localStorage.getItem("jwt") || "",
             vnp_Amount:amount || vnp_amount || "", 
             vnp_CardType: vnp_CardType || "",
             vnp_PayDate: vnp_PayDate || "",
             paymentId:Number(paymentId)
            }))
    },[])
  return (
    <div className='min-h-[90vh] flex justify-center items-center'>
        <div className='bg-primary-color text-white p-8 w-[90%] lg:w-[25%] border rounded-md h-[40vh] flex flex-col gap-7 items-center justify-center'>
            <h1 className='text-3xl font-semibold'>Congratulations!</h1>
            <h1 className='text-2xl font-semibold'>your order get success</h1>

            <div>
                <Button variant="contained" onClick={(() => navigate("/"))}>
                    Shopping More
                </Button>
            </div>
        </div>
    </div>
  )
}

export default PaymentSuccess
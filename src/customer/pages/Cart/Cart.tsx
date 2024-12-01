import React, { useEffect, useState } from 'react'
import CartItemCard from './CartItemCard'
import { Close, LocalOffer } from '@mui/icons-material'
import { lightBlue } from '@mui/material/colors'
import { Button, IconButton, TextField } from '@mui/material'
import PricingCard from './PricingCard'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { fetchUserCart } from '../../../State/customer/CartSlice'
import { applyCoupon } from '../../../State/customer/CouponSlice'

const Cart = () => {

    const [couponCode, setCouponCode] = useState("");
    const [apply, setApply] = useState(false);
    const navigate = useNavigate();
    const {cart} = useAppSelector(store => store)

    const handleChange=(e:any)=>{
        setCouponCode(e.target.value)
    };
    const totalSell = cart.cart?.totalSellingPrice;
    const jwt = localStorage.getItem("jwt")||""
    const dispatch =useAppDispatch();
    

    const handleApplyCoupon=()=>{
        setApply(true);
        dispatch(applyCoupon({apply:"true",code:couponCode,orderValue:Number(totalSell),jwt})).then(()=>{
            dispatch(fetchUserCart(localStorage.getItem("jwt") || ""))
        })
    }

    const handleRemoveCoupon=()=>{
        setCouponCode("")
        setApply(false);
        dispatch(applyCoupon({apply:"false",code:couponCode,orderValue:Number(totalSell),jwt})).then(()=>{
            dispatch(fetchUserCart(localStorage.getItem("jwt") || ""))
        })
    }

    useEffect(()=>{
        dispatch(fetchUserCart(localStorage.getItem("jwt") || ""))
    },[])
    

  return (
    <div className='pt-10 px-5 sm:px-10 md:px-60 min-h-screen'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
            <div className='cartItemSection lg:col-span-2 space-y-3'>
                {cart.cart?.cartItems.map((item)=> <CartItemCard item={item}/>)}
            </div>
            <div className='col-span-1 text-sm space-y-3'>
                <div className='border rounded-md px-5 py-3 space-y-5'>
                    
                    <div className='flex gap-3 text-sm items-center'>
                        <div className='flex gap-3 text-sm items-center'>
                            <LocalOffer sx={{color:lightBlue[600], fontSize:'17px'}}/>
                        </div>
                        <span>Apply Coupons</span>
                    </div>
                    {
                        !apply ? 
                        <div className='flex justify-between items-center'>
                            <TextField
                            onChange={handleChange}
                            value={couponCode}
                            id="outlined-basic" 
                            placeholder='coupon code'
                            size="small"
                            variant="outlined" />
                            <Button size='medium' onClick={handleApplyCoupon}>
                                Apply
                            </Button>
                        </div> :
                        <div className='flex'>
                            <div className='p-1 pl-5 pr-3 border rounded-md flex gap-2 items-center'>
                                <span className=''>{couponCode} Applied</span>
                                <IconButton size='small' onClick={handleRemoveCoupon}>
                                    <Close className='text-red-600'/>
                                </IconButton>
                            </div>
                        </div>
                        
                    }
                </div>
                <div className='border rounded-md'>
                    <PricingCard item={cart.cart}/>
                    <div className='p-5'>
                        <Button
                            onClick={()=>navigate("/checkout")} 
                            fullWidth
                            variant='contained'
                            sx={{py:"11px"}}>Buy now</Button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Cart
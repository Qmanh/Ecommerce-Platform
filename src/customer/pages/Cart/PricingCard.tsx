import { Divider } from '@mui/material'
import React from 'react'
import { Cart, CartItem } from '../../../types/CartTypes'
import { formatCurrency } from '../../../Utils/CustomCurrencyVND'

const PricingCard = ({item}:{item:any}) => {
  return (
    <>
        <div className='space-y-3 p-5 '>
            <div className='flex justify-between items-center'>
                <span>Subtotal</span>
                <span>{item ? formatCurrency(item?.totalMrpPrice): formatCurrency(0)}</span>
            </div>

            <div className='flex justify-between items-center'>
                <span>Discount</span>
                <span>{item ? formatCurrency(item?.discount) : formatCurrency(0)}</span>
            </div>

            <div className='flex justify-between items-center'>
                <span>Shipping</span>
                <span>{formatCurrency(30000)}</span>
            </div>

            <div className='flex justify-between items-center'>
                <span>Plateform Fee</span>
                <span>Free</span>
            </div>
        </div>
        <Divider/>
        <div className='flex justify-between items-center p-5 text-primary-color'>
            <span>Total</span>
            <span>{item?.totalSellingPrice? 
                formatCurrency(item?.totalSellingPrice + 30000):
                formatCurrency(0) }
            </span>
        </div>
    </>
  )
}

export default PricingCard
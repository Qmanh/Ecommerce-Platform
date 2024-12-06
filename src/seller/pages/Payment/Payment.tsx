import { Button, Card, Divider } from '@mui/material'
import React from 'react'
import Transaction from './Transaction'
import { useAppSelector } from '../../../State/Store';
import { formatCurrency } from '../../../Utils/CustomCurrencyVND';

const Payment = () => {
  const {order,seller} = useAppSelector(store=>store);
  const jwt = localStorage.getItem("jwt")||"";
  const totalMoney = order.moneyAndProduct.totalMoneyByOrder;
  const earning = seller.totalEarning.totalEarning
 
  return (
    <div className=''>
      <Card className='rounded-md space-y-4 p-5'>
        <h1 className='text-gray-600 font-medium'>Total Earning</h1>
        <h1 className='font-bold text-xl pb-1'>{formatCurrency(earning)}</h1>
        <Divider/>
        <p className='text-gray-600 font-medium pt-1'>Outstanding Amount : <strong>{formatCurrency(totalMoney - earning)}</strong></p>
      </Card>
      <div className='pt-20 space-y-3'>
        <Button variant='contained'>
          Transaction
        </Button>
        <Transaction/>
      </div>
      
    </div>
  )
}

export default Payment
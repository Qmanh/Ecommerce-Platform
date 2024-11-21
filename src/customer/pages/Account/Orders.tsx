import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { fetchUserOrderHistory } from '../../../State/customer/OrderSlice'
import OrderItemCard from './OrderItemCard'

const Orders = () => {
  const dispatch = useAppDispatch()
  const {order} = useAppSelector(store => store)

  useEffect(()=>{
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt")||""))
  },[])
  return (
    <div className='test-sm min-h-screen'>
        <div className='pb-5'>
            <h1 className='font-semibold'>All Orders</h1>
            <p>From anytime</p>
        </div>
        <div className='space-y-2'>
            {order.orders.map((order)=> order.orderItems.map((item)=> <OrderItemCard item={item} order={order}/>)) }
        </div>
    </div>
  )
}

export default Orders
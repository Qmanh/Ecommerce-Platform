import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { fetchUserOrderHistory } from '../../../State/customer/OrderSlice'
import OrderItemCard from './OrderItemCard'
import { Pagination } from '@mui/material'

const Orders = () => {
  const dispatch = useAppDispatch()
  const {order} = useAppSelector(store => store)
  const jwt = localStorage.getItem("jwt")||"";

  const [page,setPage] = useState(0);
  const newFillter={pageNumber:page};

  const handlePageChange = (value:number) => {
    setPage(value-1);
    const number = value - 1
    const fillter={pageNumber: number};
    dispatch(fetchUserOrderHistory({jwt, params:fillter}))
  }

  console.log("chhhh: ", order.dataList.dataList)

  useEffect(()=>{
    dispatch(fetchUserOrderHistory({jwt, params:newFillter}))
  },[])
  return (
    <div className='test-sm min-h-screen'>
        <div className='pb-5'>
            <h1 className='font-semibold'>All Orders</h1>
            <p>From anytime</p>
        </div>
        <div className='space-y-2'>
            {order.dataList.dataList.map((order)=> order.orderItems.map((item)=> <OrderItemCard item={item} order={order}/>)) }
        </div>

        <div className='flex justify-center py-10'>
            <Pagination 
              onChange={(e,value) => handlePageChange(value)}
              count={order.dataList.totalPageNumber}
              variant="outlined" 
              color="primary"  
            />
          </div>
    </div>
  )
}

export default Orders
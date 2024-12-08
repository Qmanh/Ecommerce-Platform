import { Box, Button, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllDeals } from '../../../State/admin/dealSlice';
import { useAppDispatch } from '../../../State/Store';
import CouponTable from './CouponTable';
import AddNewCouponForm from './AddNewCouponForm';


const tabs = [
  "Coupon Table",
  "Create Coupon",

]
const Coupon = () => {
  const [activeTab, setActiveTab] = useState("Coupon Table");
  function handleClose(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
      <div className='flex gap-4'>
        {tabs.map((item) => <Button onClick={()=>setActiveTab(item)} variant={activeTab == item?"contained":"outlined"}>{item}</Button>)}
      </div>
      <div className='mt-5'>
        {
          activeTab == "Coupon Table"?<CouponTable/>: 
          <div className='mt-5 flex flex-col justify-center items-center h-[70vh]'>
            <AddNewCouponForm/>
          </div>
        }
      </div>
    </div>
  )
}

export default Coupon
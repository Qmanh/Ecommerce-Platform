import { Box, Button, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DealTable from './DealTable';
import DealCategoryTable from './DealCategoryTable';
import CreateDealForm from './CreateDealForm';
import { getAllDeals } from '../../../State/admin/dealSlice';
import { useAppDispatch } from '../../../State/Store';
import DealForm from './DealForm';

const tabs = [
  "Deals",
  "Category",
  "Create Deal"
]
const Deal = () => {
  const [activeTab, setActiveTab] = useState("Deals");
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
          activeTab == "Deals"?<DealTable/>: 
          activeTab == "Category"?<DealCategoryTable/>:
          <div className='mt-5 flex flex-col justify-center items-center h-[70vh]'>
            <CreateDealForm/>
          </div>
        }
      </div>
    </div>
  )
}

export default Deal
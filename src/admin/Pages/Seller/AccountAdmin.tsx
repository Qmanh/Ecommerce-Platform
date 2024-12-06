import { Box, Button, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllDeals } from '../../../State/admin/dealSlice';
import { useAppDispatch } from '../../../State/Store';
import SellersTable from './SellersTable';
import CustomersTable from './CustomersTable';



const tabs = [
  "Seller Table",
  "Customer Table",

]
const AccountAdmin = () => {
  const [activeTab, setActiveTab] = useState("Seller Table");
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
          activeTab == "Seller Table"?<SellersTable/>: 
          <CustomersTable/>
        }
      </div>
    </div>
  )
}

export default AccountAdmin
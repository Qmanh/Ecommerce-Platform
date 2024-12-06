import { Box, Button, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../State/Store';
import SizeTable from './SizeTable';
import CreateSizeForm from './CreateSizeForm';

const tabs = [
  "Sizes",
  "Create Size"
]
const Size = () => {
  const [activeTab, setActiveTab] = useState("Sizes");
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
          activeTab == "Sizes"?<SizeTable/>: 
          <div className='mt-5 flex flex-col justify-center items-center h-[70vh]'>
            <CreateSizeForm/>
          </div>
        }
      </div>
    </div>
  )
}

export default Size
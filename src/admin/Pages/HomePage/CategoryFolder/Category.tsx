import { Button } from '@mui/material';
import React, { useState } from 'react'
import CategoryTable from './CategoryTable';
import CategoryForm from './CategoryForm';
import CategoryTable2 from './CategoryTable2';
import CategoryTable3 from './CategoryTable3';

const tabs = [
  "Category",
  "Category 2",
  "Category 3",
  "Create Category",
]
const Category = () => {
  const [activeTab, setActiveTab] = useState("Category");
  function handleClose(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void {
    throw new Error('Function not implemented.');
  }
  return (
    <div>
      <div className='flex gap-4'>
        {tabs.map((item) => <Button onClick={() => setActiveTab(item)} variant={activeTab == item ? "contained" : "outlined"}>{item}</Button>)}
      </div>
      <div className='mt-5'>
        {
          activeTab == "Category" ? <CategoryTable /> :
          activeTab == "Category 2" ? <CategoryTable2 /> :
          activeTab == "Category 3" ? <CategoryTable3 /> :
              <div className='mt-5 flex flex-col justify-center items-center h-[70vh]'>
                <CategoryForm />
              </div> 
        }
      </div>
    </div>
  )
}

export default Category
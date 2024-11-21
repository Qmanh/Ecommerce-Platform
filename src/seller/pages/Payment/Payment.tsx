import { Button, Card, Divider } from '@mui/material'
import React from 'react'
import Transaction from './Transaction'

const Payment = () => {
  return (
    <div className=''>
      <Card className='rounded-md space-y-4 p-5'>
        <h1 className='text-gray-600 font-medium'>Total Earning</h1>
        <h1 className='font-bold text-xl pb-1'>9867$</h1>
        <Divider/>
        <p className='text-gray-600 font-medium pt-1'>Last Payment : <strong>0$</strong></p>
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
import React from 'react'
import './RightSide.css';
import Updates from './Updates/Updates';
import CustomerReview from '../CustomerReview/CustomerReview';

const RightSide = () => {
  return (
    <div className='RightSide'>
        <div>
            <h3 className='font-bold size-5'>Updates</h3>
            <Updates/>
        </div>
        <div className='font-bold'>
            <h3>Customer Review</h3>
            <CustomerReview/>
        </div>

    </div>
  )
}

export default RightSide
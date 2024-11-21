import React from 'react'
import ReviewCard from './ReviewCard'
import { Divider } from '@mui/material'

const Review = () => {
  return (
    <div className='p-5 lg:px-20 flex flex-col lg:flex-row gap-20'>
        <section className='w-full md:w-1/2 lg:w-[30%] space-y-2'>
          <img
            src='https://i.pinimg.com/564x/8f/23/aa/8f23aa905da1e1a51dca474f2ca53699.jpg'
            alt=''
          />

          <div>
            <p className='font-bold text-xl'>Derey T-shirt Simple</p>
            <p className='text-lg text-gray-600'>Men Black T-shirt</p>
          </div>

          <div className='price flex items-center gap-3 mt-5 text-2xl'>
            <span className='font-sans text-gray-800'>
              15 $
            </span>
            <span className='line-through text-gray-400'>
              30 $
            </span>
            <span className='text-primary-color font-semibold'>
              50%
            </span>
          </div>
        </section>

        <section className='space-y-5 w-full'>
          {[1,1,1,1,1].map((item) => 
          <div className='space-y-3'>
             <ReviewCard/>
             <Divider/>
          </div>)}
        </section>
    </div>
  )
}

export default Review

import React from 'react'
import { Deal } from '../../../../types/DealTypes'

function DealCard({item}:{item:Deal}) {
  return (
    <div className='w-[20rem] cursor-pointer rounded-xl custom-shadow'>
      
        <div className='p-5 flex flex-col'>
            <div className='rounded-xl overflow-hidden '>
                <img
                    className='w-full h-[12rem] object-cover object-top'
                    src={item.category.image}
                    alt=''
                />
            </div>
            <div className='text-center'>
                <h5 className='text-2xl md:text-3xl font-medium mt-3'>{item.category.name}</h5>
                <p className='tetx-slate-500 text-lg mt-3'>{item.discount}% OFF</p>
            </div>

            <a className='text-center bg-blue-300 text-white-400 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-200 focus:scale-95
                transition-all duration-200 ease-out'>Shop Now</a>
        
        </div>
    </div>
  )
}

export default DealCard
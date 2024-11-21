import React from 'react'
import "./ShopByCategory.css";
import { HomeCategory } from '../../../../types/HomeCategoryTypes';

function ShopByCategoryCard({item}:{item:HomeCategory}) {
  return (
    <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
        <div className='custome-border w-[150px] h-[150px] rounded-3xl lg:w-[249px] lg:h-[249px] '>
            <img
                className='rounded-2xl group-hover:scale-95 transition-transform transform-duration-700 object-cover object-top h-full w-full'
                src={item.image}
                alt=''
            />
        </div>
        <h1>{item.name}</h1>
    </div>
  )
}

export default ShopByCategoryCard
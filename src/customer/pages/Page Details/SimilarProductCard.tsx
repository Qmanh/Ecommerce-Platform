import React from 'react'

const SimilarProductCard = () => {
  return (
    <div className='group px-4 relative'>
        <div className='card'>
            <img
                className='card-media object-top'
                src='https://i.pinimg.com/236x/41/3a/1c/413a1c3f82f3d9b7a03647c1a750c380.jpg'
                alt=''
            />
          
        </div>

        <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
          <div className='name'>
            <h1>Degrey</h1>
            <p>Blue Shirt</p>
          </div>

          <div className='price flex items-center gap-3'>
            <span className='font-sans text-gray-800'>
              15 $
            </span>
            <span className='thin-line-through text-gray-400'>
              30 $
            </span>
            <span className='text-primary-color font-semibold'>
              50%
            </span>
          </div>
        </div>
      </div>
  )
}

export default SimilarProductCard
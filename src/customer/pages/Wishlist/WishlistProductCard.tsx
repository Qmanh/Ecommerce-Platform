import React from 'react'
import { Product } from '../../../types/ProductTypes'
import { Close } from '@mui/icons-material'
import { useAppDispatch } from '../../../State/Store'
import { addProductToWishlist } from '../../../State/customer/WishlistSlice'
import { lightBlue } from '@mui/material/colors'
import { formatCurrency } from '../../../Utils/CustomCurrencyVND'

const WishlistProductCard = ({ item }: { item: Product }) => {
  const dispatch = useAppDispatch();
  const handleWishlist = () => {
    item.id && dispatch(addProductToWishlist({ productId: item.id }))
  }

  return (
    // <div className='w-60 relative'>
    //   {/* <div className='card'>
    //     <img className='object-top w-full' src={item.images[0]} alt="" />
    //   </div>
    //   <div className='pt-3 space-y-1'>
    //     <p>{item.title}</p>

    //     <div className='price flex items-center gap-3'>
    //         <span className='font-sans text-gray-800'>
    //           {item.sellingPrice} $
    //         </span>
    //         <span className='thin-line-through text-gray-400'>
    //           {item.mrpPrice} $
    //         </span>
    //         <span className='text-primary-color font-semibold'>
    //           {item.discountPercent}%
    //         </span>
    //       </div>
    //   </div> */}

    //   <div className='absolute top-1 right-1'>
    //     <button onClick={handleWishlist}>
    //       <Close className='cursor-pointer bg-white rounded-full p-1' sx={{color:lightBlue[500], fontSize:"2rem"}}/>
    //     </button>
    //   </div>
    // </div>

    <div className="p-2 group">
      <div className="w-60 relative">
        <div className=''>
          <img src={item.images[0]} alt="..." className="object-top w-full" style={{ height: "350px", objectFit: "cover" }} />
        </div>
        <div className="absolute top-0 right-0 bg-white dark:bg-slate-800 hover:text-blue-600 flex justify-center items-center rounded-full p-1">
          <button onClick={handleWishlist}>
            <Close className='cursor-pointer bg-white rounded-full p-1' sx={{ color: lightBlue[500], fontSize: "2rem" }} />
          </button>
        </div>
        <h5 className="font-medium text-lg text-primary-color bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full absolute -bottom-3 right-3">
          Sale: {item.discountPercent}%
        </h5>
      </div>
      <div className="py-4 lg:py-6 text-start px-1 group-hover-effect rounded-b-2xl border-t-5">
        <h5 className="text-[17px] font-medium">{item.title}</h5>

        <div className="flex justify-between items-center px-">
          <h5 className="text-blue-600 font-medium text-[17px] leading-none my-2">
            {formatCurrency(item.sellingPrice)}
          </h5>
          <a href="#!">
            <h5 className="hover:text-blue-600 thin-line-through text-gray-400">
              {formatCurrency(item.mrpPrice)}
            </h5>
          </a>
        </div>
      </div>
    </div>
  )
}

export default WishlistProductCard
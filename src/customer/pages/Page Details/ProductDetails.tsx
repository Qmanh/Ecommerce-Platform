import { Add, AddShoppingCart, Favorite, FavoriteBorder, LocalShipping, Remove, Shield, Star, Wallet, WorkspacePremium } from '@mui/icons-material'
import { Button, ButtonGroup, Divider } from '@mui/material'
import { lightBlue, yellow } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import SimilarProduct from './SimilarProduct'
import ReviewCard from '../Review/ReviewCard'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { fetchProductById } from '../../../State/customer/ProductSlice'
import { useParams } from 'react-router-dom'
import { AddItemRequest, addItemToCart } from '../../../State/customer/CartSlice'
import { formatCurrency } from '../../../Utils/CustomCurrencyVND'
import "./ProductDetails.css";
import { colors } from '../../../data/filter/color'

const ProductDetails = () => {

  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const { product } = useAppSelector(store => store)
  const [activeImage, setActiveImage] = useState(0);
  
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [size,setSize] = useState("");
  const [color,setColor] = useState("");

  const sortedSizes = product.product?.sizes.slice().sort((a, b) => b.name.localeCompare(a.name));
  
  useEffect(() => {
    dispatch(fetchProductById(Number(productId)))
  }, [productId])

  const handleActiveImage = (value: number) => () => {
    setActiveImage(value)
  }

  const itemRequest: AddItemRequest = {
    productId: product.product?.id,
    size: size,
    // color:color,
    quantity: quantity,
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart({ jwt: localStorage.getItem("jwt"), request: itemRequest }))
  }

  const handleChooseSize = (index: any, name:any) => {
    setSelectedSize(index)
    setSize(name);
    console.log("index: ", index)
  }

  const handleChooseColor = (index: any, name:any) => {
    setSelectedColor(index)
    setColor(name)
    console.log("index: ", index)
  }

  return (
    <div className='px-5 lg:px-20 pt-10'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        <section className='flex flex-col lg:flex-row gap-5'>
          <div className='w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3'>

            {product.product?.images.map((item, index) => (
              <img
                onClick={handleActiveImage(index)}
                className='lg:w-full w-[50px] cursor-pointer rounded-md'
                src={item} alt='' />
            ))}
          </div>

          <div className='w-full lg:w-[85%]'>
            <img
              className='w-full rounded-md'
              src={product.product?.images[activeImage]}
              alt=''
            />
          </div>
        </section>

        <section>
          <h1 className='font-bold text-lg text-primary-color'>{product.product?.seller?.businessDetails.businessName}</h1>
          <p className='text-gray-500 font-semibold'>{product.product?.title}</p>
          <div className='flex justify-between items-center py-2 border w-[180px] px-3 mt-5'>
            <div className='flex gap-1 items-center'>
              <span>4</span>
              <Star sx={{ color: yellow[800], fontSize: "17px" }} />
            </div>
            <Divider orientation='vertical' flexItem />
            <span>100 Ratings</span>
          </div>
          <div>
            <div className='price flex items-center gap-3 mt-5 text-2xl'>
              <span className='font-sans text-gray-800'>
                {formatCurrency(product.product?.sellingPrice || 0)}
              </span>
              <span className='line-through text-gray-400'>
                {formatCurrency(product.product?.mrpPrice || 0)}
              </span>
              <span className='text-primary-color font-semibold'>
                {product.product?.discountPercent}%
              </span>
            </div>
            <p className='text-sm'>Inclusive of all taxes. Free Shipping above 200$.</p>
          </div>

          <div className='mt-7 space-y-3'>
            <div className='flex items-center gap-4'>
              <Shield sx={{ color: lightBlue[500] }} />
              <p>Authentic & Quality Assured</p>
            </div>
            <div className='flex items-center gap-4'>
              <WorkspacePremium sx={{ color: lightBlue[500] }} />
              <p>100% money back guarantee</p>
            </div>
            <div className='flex items-center gap-4'>
              <LocalShipping sx={{ color: lightBlue[500] }} />
              <p>Free Shipping & Returns</p>
            </div>
            <div className='flex items-center gap-4'>
              <Wallet sx={{ color: lightBlue[500] }} />
              <p>Pay on delivery might be available</p>
            </div>
          </div>

          <div className='mt-7 space-y-2'>
            <h1>QUANTITY</h1>
            <div className='flex items-center gap-2 w-[140px] justify-between'>
              <Button disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)}>
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity + 1)}>
                <Add />
              </Button>
            </div>
          </div>

          <div className='space-y-2 sizemenu '>
            <h1>SIZE</h1>
            <div className='flex flex-nowrap items-center'>
              {sortedSizes?.map((item, index) => {
                return (
                  <div
                    className={selectedSize === index ? 'menuSize activeSize' : 'menuSize'}
                    key={index}
                    onClick={() => handleChooseSize(index,item.name)}
                  >
                    <Button style={{color:'black',height:'20px',border: '0.5px solid #000' }}>{item.name}</Button>

                  </div>
                )
              })}
            </div>
          </div>

          {/* <div className='space-y-2 sizemenu '>
            <h1>COLOR</h1>
            <div className='flex flex-nowrap items-center'>
              {colors.map((item, index) => {
                return (
                  <div
                    className={selectedColor === index ? 'menuSize activeSize' : 'menuSize'}
                    key={index}
                    onClick={() => handleChooseColor(index, item.name)}
                  >
                    <Button style={{backgroundColor:item.hex ,height:'20px',border: '0.5px solid #000' }}></Button>

                  </div>
                )
              })}
            </div>
          </div> */}

          <div className='mt-12 flex items-center gap-5'>
            <Button
              onClick={handleAddToCart}
              fullWidth
              variant='contained'
              startIcon={<AddShoppingCart />}
              sx={{ py: "1rem" }}>
              Add To Bag
            </Button>

            <Button
              fullWidth
              variant='outlined'
              startIcon={<FavoriteBorder />}
              sx={{ py: "1rem" }}>
              Wishlist
            </Button>
          </div>

          <div className='mt-5'>
            <p>
              {product.product?.description}
            </p>
          </div>
          <div className='mt-12 space-y-5'>
            <ReviewCard />
            <Divider />
          </div>
        </section>
      </div>

      <div className='mt-20'>
        <h1 className='text-lg font-bold'>Similar Product</h1>

        <div className='pt-5'>
          <SimilarProduct />
        </div>
      </div>

    </div>
  )
}

export default ProductDetails
import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import { Button, CircularProgress, Divider, IconButton, Pagination, Rating, TextField } from '@mui/material'
import { AddPhotoAlternate, Close } from '@mui/icons-material'
import { useFormik } from 'formik'
import { UploadToCloudinary } from '../../../Utils/UploadToCloudinary'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { createReview, fetchAllReviewByProductId } from '../../../State/customer/ReviewSlice'
import { toast } from 'react-toastify'

const Review = ({id}:any) => {
  const [uploadImage, setUploadImage] = useState(false);
  const [rating, setRating] = useState(0);
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt")||"";
  const {review} = useAppSelector(store=>store);
  const [page,setPage] = useState(0);
  const newFillter={pageNumber:page};

  const formik = useFormik({
    initialValues: {
      reviewText: "",
      productImages: [],
      reviewRating:0,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(createReview({jwt,request:values,productId:id})).then(()=>{
        toast.success('Added Review Successfully!', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

          setRating(0);
          resetForm();

      })
    }
  })

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    setUploadImage(true);
    const image = await UploadToCloudinary(file);

    formik.setFieldValue("productImages", [...formik.values.productImages, image]);
    setUploadImage(false);
  }

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.productImages]
    updatedImages.splice(index, 1);
    formik.setFieldValue("productImages", updatedImages);
  }

  const handleChange = (event:any, newValue:any) => {
    setRating(newValue); 
    console.log("rating: ", newValue);
    formik.setFieldValue("reviewRating", newValue);
  };
  const handlePageChange = (value:number) => {
    setPage(value-1);
    const number = value - 1
    const fillter={pageNumber: number};
    dispatch(fetchAllReviewByProductId({productId:id, jwt, params:fillter}))
  }

  useEffect(()=>{
    dispatch(fetchAllReviewByProductId({productId:id, jwt, params:newFillter}))
  },[])

  console.log("daaaa: ",review.reviews.reviews);
  return (
    <div className=' lg:px-5 flex flex-row lg:flex-column gap-5'>
      <section className='w-full md:w-1/2 lg:w-[70%] space-y-2'>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div className='mt-2 flex'>
            <input
              type="file"
              accept='image/*'
              id='fileInput'
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="fileInput" className='relative mr-1'>
              <span className='w-20 h-20 cursor-pointer flex items-center justify-center border p-3 rounded-md border-gray-400'>
                <AddPhotoAlternate className='text-gray-700' />
              </span>
              {uploadImage && (
                <div className='absolute left-0 right-0 top-0 bottom-0 w-10 h-10 flex justify-center rounded-md items-center'>
                  <CircularProgress />
                </div>
              )}
            </label>
            <div className='flex flex-wrap gap-2'>
              {formik.values.productImages.map((image: any, index: any) => (
                <div className='relative'>
                  <img
                    className='w-[5.1rem] h-[5.1rem] rounded-md object-cover'
                    src={image}
                    key={index}
                    alt={`ProductImage ${index + 1}`} />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    className=''
                    size='small'
                    color='error'
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      outline: "none"
                    }}
                  >
                    <Close sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
          <Rating
            name="simple-controlled"
            value={rating}
            precision={1}
            onChange={handleChange} // Set the onChange handler
            readOnly={false} // Set to false to make it editable
            sx={{ marginTop: 2 }}
          />
          <TextField
            id="reviewText"
            name="reviewText"
            rows={2}
            maxRows={4}
            sx={{ marginTop: 4 }}
            value={formik.values.reviewText}
            onChange={formik.handleChange}
            fullWidth
            label='Comment'
          />
          <div className='mt-5 w-full flex justify-center'>
            <Button type="submit" variant='outlined'>Send</Button>
          </div>

        </div>
        </form>
      </section>

      <section className='space-y-2 w-full'>
        {review.reviews.reviews?.map((item) =>
          <div className='space-y-1'>
            <ReviewCard data={item}/>
            <Divider />
          </div>)}
          <div className='flex justify-center py-10'>
            <Pagination 
              onChange={(e,value) => handlePageChange(value)}
              count={review.reviews.totalPageNumber}
              variant="outlined" 
              color="primary"  
            />
          </div>
      </section>
    </div>
  )
}

export default Review
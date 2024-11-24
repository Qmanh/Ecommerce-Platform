import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { useFormik } from 'formik'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { ChangeEvent, useEffect } from 'react'
import { Box, Button, Grid2, TextField } from '@mui/material'
import { useAppDispatch } from '../../../State/Store'
import { createCoupon, getAllCoupons } from '../../../State/admin/adminCouponSlice'
import { toast } from 'react-toastify'
import { formatCurrency } from '../../../Utils/CustomCurrencyVND'
import { Navigate } from 'react-router-dom'

interface CouponFormValues{
  code:string,
  discountPercentage:number,
  validityStartDate:Dayjs | null,
  validityEndDate:Dayjs | null,
  minimumOrderValue:number,
}

const AddNewCouponForm = () => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt")||"";

  const formik = useFormik<CouponFormValues>({
    initialValues:{
      code:"",
      discountPercentage:0,
      validityStartDate:null,
      validityEndDate:null,
      minimumOrderValue:0
    },
    onSubmit:(values,{ resetForm })=>{
      const formatedValues = {
        ...values,
        ValidityStartDate:values.validityStartDate?.toISOString(),
        ValidityEndDate:values.validityEndDate?.toISOString()
      }
      dispatch(createCoupon({coupon:formatedValues, jwt}))
      .then(()=>{
        toast.success('Create Coupon Successfully!', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

          resetForm();
      })
      console.log("form submitted ", values,formatedValues)
    }
  })
  useEffect(()=>{
    <Navigate to="/admin/coupon"/>
  },[jwt])
  return (
    <div>
      <h1 className='text-2xl font-bold text-primary-color pb-5 text-center'>Create New Coupon</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component={"form"} onSubmit={formik.handleSubmit} sx={{mt:3}}>
          <Grid2 container spacing={2}>
          <Grid2 size={{xs:12, sm:6}}>
              <TextField
                        fullWidth
                        name="code"
                        label = "code"
                        value = {formik.values.code}
                        onChange={formik.handleChange}
                        error = {formik.touched.code && Boolean(formik.errors.code)}
                        helperText = {formik.touched.code && formik.errors.code}
              />
            </Grid2>
            <Grid2 size={{xs:12, sm:6}}>
              <TextField
                        fullWidth
                        name="discountPercentage"
                        label = "Discount Percentage"
                        value = {formik.values.discountPercentage}
                        onChange={formik.handleChange}
                        error = {formik.touched.discountPercentage && Boolean(formik.errors.discountPercentage)}
                        helperText = {formik.touched.discountPercentage && formik.errors.discountPercentage}
              />
            </Grid2>
            <Grid2 size={{xs:12, sm:6}}>
              <DatePicker
                sx={{width:"100%"}}
                label="Validity Start Date"
                name='validityStartDate'
                value={formik.values.validityStartDate}
                onChange={(e)=>{formik.setFieldValue("validityStartDate",e)}}
              />
            </Grid2>
            <Grid2 size={{xs:12, sm:6}}>
              <DatePicker
                sx={{width:"100%"}}
                label="Validity End Date"
                name='validityEndDate'
                onChange={(e)=>{formik.setFieldValue("validityEndDate",e)}}
                value={formik.values.validityEndDate}
              />
            </Grid2>
            <Grid2 size={{xs:12}}>
              <TextField
                fullWidth
                name="minimumOrderValue"
                label = "Minimum Order Value"
                value = {formik.values.minimumOrderValue}
                onChange={formik.handleChange}
                error = {formik.touched.minimumOrderValue && Boolean(formik.errors.minimumOrderValue)}
                helperText = {formik.touched.minimumOrderValue && formik.errors.minimumOrderValue}
              />
            </Grid2>
            <Grid2 size={{xs:12}}>
              <Button type='submit' variant='contained' fullWidth sx={{py:".8rem"}}>
                Create Coupon
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </LocalizationProvider>
      
    </div>
  )
}

export default AddNewCouponForm
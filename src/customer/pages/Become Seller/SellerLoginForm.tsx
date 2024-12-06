import { Button, CircularProgress, Grid2, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { sellerLogin } from '../../../State/seller/sellerAuthSlice'
import { sendLoginSignupOtp } from '../../../State/seller/sellerSlice'


const SellerLoginForm = () => {
  const { seller } = useAppSelector(store => store);
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: ""
    },
    onSubmit: async (values) => {
      try {
        await dispatch(sellerLogin(values));
        // Redirect to "/" after successful login
        window.location.href = "/";
      } catch (error) {
        console.log("Error occurred during signin: ", error);
      }
    }
  })

  const handleSendOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }))
  }
  console.log("otp: ", seller.sentOtp)
  return (
    <div>
      <h1 className='text-center font-bold text-xl text-primary-color pb-5'>
        Login As Seller
      </h1>
      <div className='space-y-5'>
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        {seller.sentOtp &&
          <div className='space-y-2'>
            <p className='font-medium text-sm opacity-60'>Enter OTP sent to your email</p>
            <TextField
              fullWidth
              name="otp"
              label="OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />
          </div>
        }

        {seller.sentOtp ?
          <Button onClick={() => formik.handleSubmit()} fullWidth variant="contained" sx={{ py: "11px" }}>
            Login
          </Button>
          :
          seller.loading ?
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <CircularProgress />
          </div>
          :
          <Button onClick={handleSendOtp} fullWidth variant="contained" sx={{ py: "11px" }}>
            Send OTP
          </Button>
        }
      </div>
    </div>
  )
}

export default SellerLoginForm
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { useFormik } from 'formik'
import { Alert, Button, CircularProgress, TextField } from '@mui/material'
import { sendLoginSignupOtp, signin } from '../../../State/AuthSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from "yup"

const LoginFormSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Invalid Email"),
   otp: Yup.string().required("OTP is required").matches(/^[0-9]\d{5}$/, "Invalid otp number"),
})

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const location = useLocation();

  const { auth } = useAppSelector(store => store)
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: ""
    },
    validationSchema: LoginFormSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(signin(values));
        // Redirect to "/" after successful login
        window.location.href = "/";
      } catch (error) {
        console.log("Error occurred during signin: ", error);
      }
    }
  })

  const validateEmail = (email: any) => {
    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSendOtp = () => {
    if (formik.values.email === "") {
      setError("Email field is empty. Please enter an email address.");
    } else if (!validateEmail(formik.values.email)) {
      setError("Invalid email format. Please enter a valid email address.");
    } else {
      dispatch(sendLoginSignupOtp({ email: formik.values.email }));
    }
  }
  return (
    <div>
      <h1 className='text-center font-bold text-xl text-primary-color pb-8'>Login</h1>
      <div className='space-y-5'>
        <TextField
          fullWidth
          name="email"
          label="Email"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        {auth.otpSent &&
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
        {auth.otpSent ?
          <Button onClick={() => formik.handleSubmit()} fullWidth variant="contained" sx={{ py: "11px" }}>
            Login
          </Button>
          :
          <Button onClick={handleSendOtp} fullWidth variant="contained" sx={{ py: "11px" }}>
            {auth.loading ? <CircularProgress /> : "Send OTP"}
          </Button>
        }


      </div>
    </div>
  )
}

export default LoginForm
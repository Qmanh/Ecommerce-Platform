import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { useFormik } from 'formik'
import { Alert, Button, CircularProgress, TextField } from '@mui/material'
import { sendLoginSignupOtp, signup } from '../../../State/AuthSlice'
import * as Yup from "yup"

const RegisterFormSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    fullName: Yup.string().required("FullName is required"),
    mobile: Yup.string().required("Mobile is required").matches(/^[0-9]\d{10}$/, "Invalid mobile number"),
    otp: Yup.string().required("OTP is required").matches(/^[0-9]\d{5}$/, "Invalid otp number"),
})

const RegisterForm = () => {
    const dispatch = useAppDispatch()
    const [error, setError] = useState("");
    const {auth} = useAppSelector(store=>store)
    const formik = useFormik({
        initialValues: {
            email: "",
            otp: "",
            fullName: "",
            mobile:"",
        },
        validationSchema: RegisterFormSchema,
        onSubmit: (values) => {
            try {
                dispatch(signup(values));
                // Redirect to "/" after successful login
                window.location.href = "/";
            } catch (error) {
                console.log("Error occurred during signin: ", error);
            }
        }
    })
    const validateEmail = (email:any) => {
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
            {!auth.otpSent && <h1 className='text-center font-bold text-xl text-primary-color pb-8'>Signup</h1>}
            <div className='space-y-5'>
                {!auth.otpSent &&
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
                />}
                {
                    error && 
                    <Alert variant="outlined" severity="error">{error}</Alert>
                }
                {auth.otpSent &&
                    <div className='space-y-5'>
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
                        <TextField
                            fullWidth
                            name="fullName"
                            label="Full Name"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                            helperText={formik.touched.fullName && formik.errors.fullName}
                        />

                        <TextField
                            fullWidth
                            name="mobile"
                            label="Mobile"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                            helperText={formik.touched.mobile && formik.errors.mobile}
                        />  
                    </div>
                }
                {!auth.otpSent ? 
                    <Button onClick={handleSendOtp} fullWidth variant="contained" sx={{ py: "11px" }}>
                        {auth.loading? <CircularProgress/>:"Send OTP"}
                    </Button>
                    :
                    <Button onClick={() => formik.handleSubmit()} fullWidth variant="contained" sx={{ py: "11px" }}>
                        Signup
                    </Button>
                }
                
            </div>
        </div>
    )
}

export default RegisterForm
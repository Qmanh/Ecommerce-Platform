import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'

const BankDetails = () => {
    const formik = useFormik({
        initialValues:{
            accountNumber:"",
            ifscCode: "",
            accountHolderName:""
        },
        onSubmit:(values)=>{
            console.log("form submitted ", values)
        }
    })
  return (
    <div className='space-y-5'>
        <TextField
            fullWidth
            name="bankDetails.accountNumber"
            label = "Account Number"
            value = {formik.values.accountNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error = {formik.touched.accountNumber && Boolean(formik.errors.accountNumber)}
            helperText = {formik.touched.accountNumber && formik.errors.accountNumber}
            />
        <TextField
            fullWidth
            name="bankDetails.ifscCode"
            label = "IFSC Code"
            value = {formik.values.ifscCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error = {formik.touched.ifscCode && Boolean(formik.errors.ifscCode)}
            helperText = {formik.touched.ifscCode && formik.errors.ifscCode}
            />

        <TextField
            fullWidth
            name="bankDetails.accountHolderName"
            label = "Account Holder Name"
            value = {formik.values.accountHolderName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error = {formik.touched.accountHolderName && Boolean(formik.errors.accountHolderName)}
            helperText = {formik.touched.accountHolderName && formik.errors.accountHolderName}
            />
        <Button variant='contained' fullWidth>
            Submit
        </Button>
    </div>
  )
}

export default BankDetails
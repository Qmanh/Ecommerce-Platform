import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'

const PersionalDetails = () => {
    const formik = useFormik({
        initialValues:{
            sellerName:"",
            email:"",
            mobile:""
        }, onSubmit:(values)=>{
            console.log("form submitted ", values)
        }
    });
  return (
    <div className='space-y-4'>
        <TextField
            fullWidth
            name="sellerName"
            label = "Seller Name"
            value = {formik.values.sellerName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error = {formik.touched.sellerName && Boolean(formik.errors.sellerName)}
            helperText = {formik.touched.sellerName && formik.errors.sellerName}
            />
        <TextField
            fullWidth
            name="email"
            label = "Email"
            value = {formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error = {formik.touched.email && Boolean(formik.errors.email)}
            helperText = {formik.touched.email && formik.errors.email}
            />
        <TextField
                fullWidth
                name = "mobile"
                label = "Mobile"
                value = {formik.values.mobile}
                onChange = {formik.handleChange}
                error = {formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
            />
        
        <Button sx={{py:"12px"}} fullWidth variant='contained'>
            Save
        </Button>
    </div>
  )
}

export default PersionalDetails
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'

const BussinessDetails = () => {
    const formik = useFormik({
        initialValues:{
            bussinessName:"",
            GSTIN:"",
            accountStatus:""
        }, onSubmit:(values)=>{
            console.log("form submitted ", values)
        }
    });
  return (
    <div className='space-y-4'>
    <TextField
        fullWidth
        name="businessDetails.businessName"
        label = "Business Name"
        value = {formik.values.bussinessName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error = {formik.touched.bussinessName && Boolean(formik.errors.bussinessName)}
        helperText = {formik.touched.bussinessName && formik.errors.bussinessName}
        />
        <TextField
            fullWidth
            name = "GSTIN"
            label = "GSTIN"
            value = {formik.values.GSTIN}
            onChange = {formik.handleChange}
            error = {formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
            helperText={formik.touched.GSTIN && formik.errors.GSTIN}
        />

        <Button fullWidth variant='contained'>
            Save
        </Button>
</div>
  )
}

export default BussinessDetails
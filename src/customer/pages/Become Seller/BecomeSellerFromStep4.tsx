import { TextField } from '@mui/material'
import React from 'react'

const BecomeSellerFromStep4 = ({formik}:any) => {
  return (
    <div className='space-y-5'>
        <TextField
            fullWidth
            name="businessDetails.businessName"
            label = "Business Name"
            value = {formik.values.businessDetails?.businessName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error = {formik.touched.businessDetails?.businessName && Boolean(formik.errors.businessDetails?.businessName)}
            helperText = {formik.touched.businessDetails?.businessName && formik.errors.businessDetails?.businessName}
            />
        <TextField
            fullWidth
            name="businessDetails.businessEmail"
            label = "Business Email"
            value = {formik.values.businessDetails?.businessEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error = {formik.touched.businessDetails?.businessEmail && Boolean(formik.errors.businessDetails?.businessEmail)}
            helperText = {formik.touched.businessDetails?.businessEmail && formik.errors.businessDetails?.businessEmail}
            />

        <TextField
            fullWidth
            name="businessDetails.businessMobile"
            label = "Business Mobile"
            value = {formik.values.businessDetails?.businessMobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error = {formik.touched.businessDetails?.businessMobile && Boolean(formik.errors.businessDetails?.businessMobile)}
            helperText = {formik.touched.businessDetails?.businessMobile && formik.errors.businessDetails?.businessMobile}
            />

        <TextField
            fullWidth
            name="businessDetails.businessAddress"
            label = "Business Address"
            value = {formik.values.businessDetails?.businessAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error = {formik.touched.businessDetails?.businessAddress && Boolean(formik.errors.businessDetails?.businessAddress)}
            helperText = {formik.touched.businessDetails?.businessAddress && formik.errors.businessDetails?.businessAddress}
            />
    </div>
  )
}

export default BecomeSellerFromStep4
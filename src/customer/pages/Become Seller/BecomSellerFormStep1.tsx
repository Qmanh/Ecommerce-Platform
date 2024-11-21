import { Box, TextField } from '@mui/material'
import React from 'react'

const BecomSellerFormStep1 = ({formik}:any) => {
  return (
    <Box>
        <p className='text-xl font-bold text-center pb-9'>Contact Details</p>

        <div className='space-y-9'>
            <TextField
                fullWidth
                name = "email"
                label = "Email"
                value = {formik.values.email}
                onChange = {formik.handleChange}
                error = {formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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

            <TextField
                fullWidth
                name = "gstin"
                label = "GSTIN"
                value = {formik.values.gstin}
                onChange = {formik.handleChange}
                error = {formik.touched.gstin && Boolean(formik.errors.gstin)}
                helperText={formik.touched.gstin && formik.errors.gstin}
            />
        </div>
    </Box>
  )
}

export default BecomSellerFormStep1
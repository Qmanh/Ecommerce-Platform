import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { discount } from '../../../data/filter/discount';
import { createDeal } from '../../../State/admin/dealSlice';
import { toast } from 'react-toastify';
import { createSize } from '../../../State/admin/adminSlice';

const CreateSizeForm = () => {
    const dispatch = useAppDispatch();
    const {customer} = useAppSelector(store => store);
    const formik = useFormik({
        initialValues:{
            sizeName:"",
            description:""
        },
        onSubmit:(values,{ resetForm })=>{
            console.log("submit ", values)
            const reqData = {
                name: values.sizeName,
                description: values.description
            }
            dispatch(createSize(reqData)).then(()=>{
                toast.success('Create Size Successfully!', {
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
            
        }
    })
  return (
    <Box
        component={"form"}
        onSubmit={formik.handleSubmit} 
        className='space-y-6'
    >
        <Typography variant='h4' className='text-center'>
            Create Size
        </Typography>
        <TextField
            fullWidth
            name="sizeName"
            label = "Name"
            value = {formik.values.sizeName}
            onChange={formik.handleChange}
            error = {formik.touched.sizeName && Boolean(formik.errors.sizeName)}
            helperText = {formik.touched.sizeName && formik.errors.sizeName}
        />
        <TextField
            fullWidth
            name="description"
            label = "Description"
            value = {formik.values.description}
            onChange={formik.handleChange}
            error = {formik.touched.description && Boolean(formik.errors.description)}
            helperText = {formik.touched.description && formik.errors.description}
        />

        <Button fullWidth sx={{py:".9rem"}} type="submit" variant='contained'>
            Create Size
        </Button>

    </Box>
  )
}

export default CreateSizeForm
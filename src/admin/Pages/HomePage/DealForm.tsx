import { Box, Button, CircularProgress, FormControl, FormHelperText, Grid2, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { toast } from 'react-toastify'
import { getAllDeals, updateDeal } from '../../../State/admin/dealSlice'


const DealFormSchema = Yup.object().shape({
    categoryId: Yup.string().required("Category is required"),
    discount: Yup.string().required("Discount is required"),
})

const DealForm = ({data}: {data:any}) => {
    const dispatch = useAppDispatch();
    const {deal} = useAppSelector(store => store);
    const formik = useFormik({
        initialValues: {
           
            categoryId: data.category.id,
            discount: data.discount,
        },
        validationSchema: DealFormSchema,
        onSubmit: (values) => {
            console.log("homeCategory: ",values);
            dispatch(updateDeal({id:data.id, data:values}))
            .then(()=>{
                toast.success('Updated Deal Successfully!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(getAllDeals())
            })
        },
    })

    return (
        <Box sx={{ max: "auto" }}>
            <p className='text-xl font-bold text-center pb-5'>Home Category</p>
            <form onSubmit={formik.handleSubmit} className='space-y-4 p-4'>
                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            name="discount"
                            label="Discount"
                            value={formik.values.discount}
                            onChange={formik.handleChange}
                            error={formik.touched.discount && Boolean(formik.errors.discount)}
                            // helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid2>


                    <Grid2 size={{ xs: 12 }}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.categoryId}
                            label="Category"
                            onChange={(event) => formik.setFieldValue('categoryId', event.target.value)}
                        >
                            {deal.deals.map((item:any)=>
                                <MenuItem value={item.category.id}>{item.category.categoryId}</MenuItem>
                                
                            )}
                        </Select>
                        </FormControl>
                    </Grid2>
                    

                    <Grid2 size={{ xs: 12 }}>
                        <Button fullWidth type="submit" variant="contained" sx={{ py: "14px" }}>
                            Save
                        </Button>
                    </Grid2>
                </Grid2>
            </form>
        </Box>
    )
}

export default DealForm
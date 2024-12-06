import { Box, Button, CircularProgress, FormControl, FormHelperText, Grid2, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from '../../../../State/Store'
import { toast } from 'react-toastify'
import { getAllDeals, updateDeal } from '../../../../State/admin/dealSlice'
import { createCategory, getAllCategories } from '../../../../State/admin/categorySlice'


const CategoryFormSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    categoryId: Yup.string().required("CategoryId is required"),
    level: Yup.number()
        .required("Level is required")
        .min(1)
        .max(3)
})

const CategoryForm = () => {
    const dispatch = useAppDispatch();
    const { category } = useAppSelector(store => store);
    const [level, setLevel] = useState(1);
    const formik = useFormik({
        initialValues: {
            name: "",
            categoryId: "",
            level: 1,
            parentCategoryId: "",
        },
        validationSchema: CategoryFormSchema,
        onSubmit: (values, {resetForm}) => {
            console.log("Category: ", values);
            dispatch(createCategory(values))
            .then(()=>{
                toast.success('Created Category Successfully!', {
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
                //dispatch(getAllDeals())
            })
        },
    })

    useEffect(() => {
        const newfillter = {
            pageNumber: 0,
            level: Number(level) > 3 ? 2 : Number(level - 1)
        };
        dispatch(getAllCategories(newfillter))
    }, [level])

    return (
        <Box sx={{ max: "auto" }}>
            <p className='text-xl font-bold text-center pb-5'>Home Category</p>
            <form onSubmit={formik.handleSubmit} className='space-y-4 p-4'>
                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            name="categoryId"
                            label="Category Id"
                            value={formik.values.categoryId}
                            onChange={formik.handleChange}
                            error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 6 }}>
                        {/* <TextField
                            fullWidth
                            name="level"
                            label="Level Category"
                            value={formik.values.level}
                            onChange={(event) => (formik.setFieldValue('level', event.target.value),
                                setLevel(Number(event.target.value))
                            )}
                            error={formik.touched.level && Boolean(formik.errors.level)}
                        /> */}

                        <FormControl fullWidth>
                            <InputLabel id="level">Level</InputLabel>
                            <Select
                                labelId="level"
                                id="level"
                                value={formik.values.level}
                                label="Level"
                                onChange={(event) => (formik.setFieldValue('level', event.target.value),
                                    setLevel(Number(event.target.value))
                                )}
                            >
                                
                                <MenuItem value= {1}>Level 1</MenuItem>
                                <MenuItem value= {2}>Level 2</MenuItem>
                                <MenuItem value= {3}>Level 3</MenuItem>
                                    
                            </Select>
                        </FormControl>
                    </Grid2>

                    <Grid2 size={{ xs: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category Parent</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.parentCategoryId}
                                label="Parent Category"
                                onChange={(event) => formik.setFieldValue('parentCategoryId', event.target.value)}
                            >
                                {

                                    category.category.map((item) => (
                                        <MenuItem value={item.categoryId}>{item.name}</MenuItem>
                                    )


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

export default CategoryForm
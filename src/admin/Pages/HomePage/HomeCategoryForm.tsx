import { Box, Button, CircularProgress, FormControl, FormHelperText, Grid2, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { useAppDispatch } from '../../../State/Store'
import { createOrder } from '../../../State/customer/OrderSlice'
import { UploadToCloudinary } from '../../../Utils/UploadToCloudinary'
import { AddPhotoAlternate, Close } from '@mui/icons-material'
import { HomeCategory, HomeCategorySection, HomeCategoryUpdate } from '../../../types/HomeCategoryTypes'
import { updateHomeCategory } from '../../../State/admin/adminSlice'
import { sectionCategory } from '../../../data/SectionCategory'
import { toast } from 'react-toastify'
import { fetchHomePageData } from '../../../State/customer/CustomerSlice'

const CategoryFormSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    image: Yup.string().required("Image is required"),
    categoryId: Yup.string().required("Category is required"),
    section: Yup.string().required("Section is required"),
})

const HomeCategoryForm = ({data}: {data:any}) => {
    const dispatch = useAppDispatch();
    const [uploadImage, setUploadImage] = useState(false);
    const [haveImage, setHaveImage] = useState(false);

    const findValueByName = (name:any) => {
        const category = sectionCategory.find(item => item.name === name);
        return category ? category.value : null;
    };

    const formik = useFormik({
        initialValues: {
            name: data.name,
            image: data.image,
            categoryId: data.categoryId,
            section: findValueByName(data.section),
        },
        validationSchema: CategoryFormSchema,
        onSubmit: (values) => {
            console.log("homeCategory: ",values);
            dispatch(updateHomeCategory({id:data.id,data:values}))
            .then(()=>{
                dispatch(fetchHomePageData())
                toast.success('Updated Home Category Successfully!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
        },
    })

    const handleImageChange = async (event: any) => {
        const file = event.target.files[0];
        setUploadImage(true);
        setHaveImage(true);
        const image = await UploadToCloudinary(file);

        formik.setFieldValue("image", image);
        setUploadImage(false);
    }

    const handleRemoveImage = () => {
        const updatedImages = [...formik.values.image]
        updatedImages.splice(0, 0);
        formik.setFieldValue("image", updatedImages);
        setHaveImage(false);
    }
    return (
        <Box sx={{ max: "auto" }}>
            <p className='text-xl font-bold text-center pb-5'>Home Category</p>
            <form onSubmit={formik.handleSubmit} className='space-y-4 p-4'>
                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            // helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid2>


                    <Grid2 className='flex flex-wrap gap-5' size={{ xs: 12 }}>
                        <input
                            type="file"
                            accept='image/*'
                            id='fileInput'
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                        <label htmlFor="fileInput" className='relative'>
                            <span className='w-24 h-24 cursor-pointer flex items-center justify-center border p-3 rounded-md border-gray-400'>
                                <AddPhotoAlternate className='text-gray-700' />
                            </span>
                            {uploadImage && (
                                <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                                    <CircularProgress />
                                </div>
                            )}
                        </label>

                        <div className='flex flex-wrap gap-2'>
                            {formik.values.image && <div className='relative'>
                                <img
                                    className='w-24 h-24 object-cover'
                                    src={formik.values.image}
                                    key={0}
                                    alt={`HomeCategoryImage`} />
                                <IconButton
                                    onClick={() => handleRemoveImage()}
                                    className=''
                                    size='small'
                                    color='error'
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        outline: "none"
                                    }}
                                >
                                    <Close sx={{ fontSize: "1rem" }} />
                                </IconButton>
                            </div>}
                        </div>
                    </Grid2>

                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            name="categoryId"
                            label="Category"
                            value={formik.values.categoryId}
                            onChange={formik.handleChange}
                            error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                            // helperText={formik.touched.categoryId && formik.errors.categoryId}
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12 }}>
                        <FormControl
                            fullWidth
                            error={formik.touched.section && Boolean(formik.errors.section)}
                            required
                        >
                            <InputLabel id="section-label">Section</InputLabel>
                            <Select
                                labelId="section-label"
                                id="section"
                                name="section"
                                value={formik.values.section}
                                onChange={formik.handleChange}
                                label="Section"
                            >
            
                                {
                                    sectionCategory.map((item)=>(
                                        <MenuItem value={item.value}>{item.name}</MenuItem>
                                    ))
                                }
                                
                                
                            </Select>
                            {/* {
                                // formik.touched.section && formik.errors.section && (
                                //     <FormHelperText>{formik.errors.section}</FormHelperText>
                                // )
                            } */}
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

export default HomeCategoryForm
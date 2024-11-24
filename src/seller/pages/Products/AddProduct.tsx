import { AddPhotoAlternate, Close } from '@mui/icons-material'
import { Button, CircularProgress, FormControl, FormHelperText, Grid2, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { UploadToCloudinary } from '../../../Utils/UploadToCloudinary';
import { mainCategory } from '../../../data/category/mainCategory';
import { useAppDispatch } from '../../../State/Store';
import { createProduct } from '../../../State/seller/sellerProductSlice';
import { colors } from '../../../data/filter/color';
import { menLevelTwo } from '../../../data/category/level two/menLevelTwo';
import { womenLevelTwo } from '../../../data/category/level two/womenLevelTwo';
import { electronicsLevelTwo } from '../../../data/category/level two/electronicsLevelTwo';
import { furnitureLevelTwo } from '../../../data/category/level two/furnitureLevelTwo';
import { menLevelThree } from '../../../data/category/leve three/menLevelThree';
import { womenLevelThree } from '../../../data/category/leve three/womenLevelThree';
import { electronicsLevelThree } from '../../../data/category/leve three/electronicsLevelThree';
import { furnitureLevelThree } from '../../../data/category/leve three/furnitureLevelThree';
const categoryTwo:{[key:string]:any[]} = {
  men:menLevelTwo,
  women:womenLevelTwo,
  electronics: electronicsLevelTwo,
  home_furniture: furnitureLevelTwo
}
const categoryThree:{[key:string]:any[]} ={
  men:menLevelThree,
  women:womenLevelThree,
  electronics: electronicsLevelThree,
  home_furniture: furnitureLevelThree
}

const AddProduct = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues:{
      title:"",
      description:"",
      mrpPrice:"",
      sellingPrice:"",
      quantity:"",
      color:"",
      images:[],
      category:"",
      category2:"",
      category3:"",
      sizes:"",
    }, 
    onSubmit: (values)=>{
      console.log("values: ",values)
      dispatch(createProduct({request:values, jwt:localStorage.getItem("jwt")}))
    }
  })
  const handleImageChange = async (event:any)=>{
    const file =event.target.files[0];
    setUploadImage(true);
    const image = await UploadToCloudinary(file);

    formik.setFieldValue("images",[...formik.values.images, image]);
    setUploadImage(false);
  }
  const handleRemoveImage = (index: number)=>{
    const updatedImages = [...formik.values.images];
    updatedImages.slice(index,1);
    formik.setFieldValue("images", updatedImages);
  }

  const childCategory = (category: any, parentCategoryId: any)=>{
    return category.filter((child:any)=>{
      return child.parentCategoryId == parentCategoryId;
    });
  };

  const handleCloseSnackbar = () =>{
    setSnackbar(false);
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className='space-y-4 p-4'>
        <Grid2 container spacing={2}>
          <Grid2 className='flex flex-wrap gap-5' size={{xs:12}}>
            <input 
              type="file" 
              accept='image/*'
              id='fileInput'
              style={{display: "none"}}
              onChange={handleImageChange}
            />
            <label htmlFor="fileInput" className='relative'>
              <span className='w-24 h-24 cursor-pointer flex items-center justify-center border p-3 rounded-md border-gray-400'>
                <AddPhotoAlternate className='text-gray-700'/>
              </span>
              {uploadImage && (
                <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                  <CircularProgress/>
                </div>
              )}
            </label>

            <div className='flex flex-wrap gap-2'>
              {formik.values.images.map((image, index)=>(
                <div className='relative'>
                  <img
                    className='w-24 h-24 object-cover'
                    src={image}
                    key={index} 
                    alt={`ProductImage ${index+1}`} />
                  <IconButton
                    onClick={()=> handleRemoveImage(index)}
                    className=''
                    size='small'
                    color='error'
                    sx={{
                      position: 'absolute',
                      top:0,
                      right:0,
                      outline:"none"
                    }}
                  >
                    <Close sx={{fontSize:"1rem"}}/>
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid2>
          <Grid2 size={{xs:12}}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                required
              />
          </Grid2>

          <Grid2 size={{xs:12}}>
              <TextField
                multiline
                rows={4}
                fullWidth
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                required
              />
          </Grid2>

          <Grid2 size={{xs:12, md:4, lg:3}}>
              <TextField
                fullWidth
                id="mrpPrice"
                name="mrpPrice"
                label="MRP Price"
                type='number'
                value={formik.values.mrpPrice}
                onChange={formik.handleChange}
                error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
                helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
                required
              />
          </Grid2>

          <Grid2 size={{xs:12, md:4, lg:3}}>
              <TextField
                fullWidth
                id="sellingPrice"
                name="sellingPrice"
                label="Selling Price"
                type='number'
                value={formik.values.sellingPrice}
                onChange={formik.handleChange}
                error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
                helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
                required
              />
          </Grid2>

          <Grid2 size={{xs:12, md:4, lg:3}}>
              <FormControl
                fullWidth
                error = {formik.touched.color && Boolean(formik.errors.color)}
                required
              >
                <InputLabel id="color-label">Color</InputLabel>
                <Select
                  labelId='color-label'
                  id='color'
                  name='color'
                  value={formik.values.color}
                  onChange={formik.handleChange}
                  label='Color'
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {
                    colors.map((color, index)=> 
                    <MenuItem value = {color.name}>
                      <div className='flex gap-3'>
                        <span style={{backgroundColor: color.hex}} 
                        className={`h-5 w-5 rounded-full ${color.name === "White"?"border":""}`}></span>
                        <p>{color.name}</p>
                      </div>
                    </MenuItem>)}
                </Select>
                {
                  formik.touched.color && formik.errors.color && (
                    <FormHelperText>{formik.errors.color}</FormHelperText>
                  )}
              </FormControl>
          </Grid2>

          <Grid2 size={{xs:12, md:4, lg:3}}>
            <FormControl
              fullWidth
              error = {formik.touched.sizes && Boolean(formik.errors.sizes)}
              required
            >
              <InputLabel id="sizes-label">Sizes</InputLabel>
              <Select
                labelId="sizes-label"
                id="sizes"
                name="sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
                label="Sizes"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value='FREE'>FREE</MenuItem>
                <MenuItem value='S'>S</MenuItem>
                <MenuItem value='M'>M</MenuItem>
                <MenuItem value='L'>L</MenuItem>
                <MenuItem value='XL'>XL</MenuItem>
              </Select>
              {
                formik.touched.sizes && formik.errors.sizes &&(
                  <FormHelperText>{formik.errors.sizes}</FormHelperText>
                )}
            </FormControl>
          </Grid2>

          <Grid2 size={{xs:12, md:4, lg:4}}>
            <FormControl
              fullWidth
              error = {formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                label="Category"
              >
                
                {
                  mainCategory.map((item)=>(
                    <MenuItem value={item.categoryId}>{item.name}</MenuItem>
                ))
                }
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid2>

          <Grid2 size={{xs:12, md:4, lg:4}}>
            <FormControl
              fullWidth
              error = {formik.touched.category2 && Boolean(formik.errors.category2)}
              required
            >
              <InputLabel id="category-label">Second Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category2"
                value={formik.values.category2}
                onChange={formik.handleChange}
                label="Second Category"
              >
          
                {
                  formik.values.category && categoryTwo[formik.values.category]?.map((item)=>(
                    <MenuItem value={item.categoryId}>{item.name}</MenuItem>
                  ))
                }
              </Select>
              {formik.touched.category2 && formik.errors.category2 && (
                <FormHelperText>{formik.errors.category2}</FormHelperText>
              )}
            </FormControl>
          </Grid2>

          <Grid2 size={{xs:12, md:4, lg:4}}>
            <FormControl
              fullWidth
              error = {formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category-label">Third Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category3"
                value={formik.values.category3}
                onChange={formik.handleChange}
                label="Third Category"
              >
                {formik.values.category2 && childCategory(
                  categoryThree[formik.values.category],
                  formik.values.category2
                )?.map((item: any)=> (
                  <MenuItem value={item.categoryId}>{item.name}</MenuItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid2>

          <Grid2 size={{xs:12}}>
            <Button
              sx={{p:"14px"}}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              // disabled={sellerProduct.loading}
            >
              {false ? <CircularProgress size="small"
                sx={{ width: "27px", height:"27px"}} />
                :"Add Product"
              }
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </div>
  )
}

export default AddProduct
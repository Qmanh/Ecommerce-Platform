import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { menLevelTwo } from '../../data/category/level two/menLevelTwo'
import { womenLevelTwo } from '../../data/category/level two/womenLevelTwo'
import { electronicsLevelTwo } from '../../data/category/level two/electronicsLevelTwo'
import { furnitureLevelTwo } from '../../data/category/level two/furnitureLevelTwo'
import { menLevelThree } from '../../data/category/leve three/menLevelThree'
import { womenLevelThree } from '../../data/category/leve three/womenLevelThree'
import { electronicsLevelThree } from '../../data/category/leve three/electronicsLevelThree'
import { furnitureLevelThree } from '../../data/category/leve three/furnitureLevelThree'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../State/Store'
import { getAllCategoriesCustomer, getAllCategoriesCustomer2, getAllCategoriesCustomer3 } from '../../State/admin/categorySlice'



const CategorySheet = ({selectedCategory, setShowSheet}:any) => {
    const dispatch = useAppDispatch();
    const {category} = useAppSelector(store=>store);

    // useEffect(()=>{
    //     dispatch(getAllCategoriesCustomer2())
    //     dispatch(getAllCategoriesCustomer3())
        
    // },[])

    const men = category.category2.filter(category =>
        category.parentCategory && category.parentCategory.categoryId === 'men'
    )
    const women = category.category2.filter(category => 
        category.parentCategory && category.parentCategory.categoryId === 'women'
    )


    const LevelThree = category.category3.map(category => ({
        name: category.name,
        categoryId: category.categoryId,
        parentCategoryName: category.parentCategory ? category.parentCategory.name : null,
        parentCategoryId: category.parentCategory ? category.parentCategory.categoryId : null,
    }));
    console.log(menLevelThree)
    const categoryTwo:{[key:string]:any[]} = {
        men: men|| [],
        women:women ||[],

    }
    const categoryThree:{[key:string]:any[]} ={
        men:menLevelThree || [],
        women:LevelThree || [],
    }

    const childCategory=(category:any,parentCategoryId:any)=>{
        return category.filter((child:any)=> child.parentCategoryId==parentCategoryId)
    }
    const navigate = useNavigate();

  return (
    <>
        <Box 
        sx={
            {zIndex: 2}
        } 
        className="bg-white shadow-lg lg:h-[500px] overflow-y-auto">
            <div className='flex text-md flex-wrap'>

                {
                    categoryTwo[selectedCategory]?.map((item:any,index:any) => 
                    <div className={`p-8 lg:w-[20%] ${index %2===0?"bg-slate-50":"bg-white"}`}>
                        <p className='text-primary-color mb-5 font-semibold'>{item.name}</p>
                        <ul className='space-y-3 '>
                            {childCategory(categoryThree[selectedCategory],item.categoryId).map((item:any)=>
                                <div>
                                    <li onClick={() => navigate("/products/" + item.categoryId)} className='hover:text-primary-color cursor-pointer'>
                                        {item.name}
                                    </li>
                                </div>
                            )}
                            
                        </ul>
                    </div>)
                }

            </div>
        </Box>
    </>
  )
}

export default CategorySheet
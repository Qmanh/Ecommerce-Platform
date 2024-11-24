import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { HomeCategory, HomeCategoryUpdate } from "../../types/HomeCategoryTypes";

const API_URL = '/admin';

export const updateHomeCategory = createAsyncThunk<HomeCategory, {id: number; data:HomeCategoryUpdate}
> (
    'homeCategory/updateHomeCategory',
    async ({id, data}, {rejectWithValue}) =>{
        try {
            const response = await api.patch(`${API_URL}/home-category/${id}`,data);
            console.log("category updated ", response)
            return response.data;
        } catch (error:any) {
            console.log("error ", error)
            if(error.response && error.response.data){
                return rejectWithValue(error.response.data);
            }else{
                return rejectWithValue("An error occured while updating the category.");
            }
        }
    }
)

export const fetchHomeCategories = createAsyncThunk<HomeCategory[]>(
    "homeCategory/fetchHomeCategories",
    async (_, {rejectWithValue}) =>{
        try {
            const response = await api.get(`${API_URL}/home-category`);
            console.log("categories ", response.data)
            return response.data
        } catch (error:any) {
            console.log("error ", error.response)
            return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
        }
    }
)

interface HomeCategoryState {
    categories: HomeCategory[];
    loading: boolean;
    error: string | null;
    categoryUpdated: boolean;
}

const initialState: HomeCategoryState = {
    categories:[],
    loading: false,
    error: null,
    categoryUpdated: false,
}

const homeCategorySlice = createSlice({
    name: 'homeCategory',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(updateHomeCategory.pending, (state)=>{
                state.loading = true;
                state.error = null;
                state.categoryUpdated = false;
            })
            .addCase(updateHomeCategory.fulfilled, (state, action)=>{
                state.loading = false;
                state.categoryUpdated = true;
                
                //find the category by ID and update
                const index = state.categories.findIndex((category)=> category.id === action.payload.id)
                if(index !== -1){
                    state.categories[index] = action.payload;
                }else{
                    state.categories.push(action.payload);
                }
            })

            //Handle the reject update
            .addCase(updateHomeCategory.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            //fetch homecategory
        builder
            .addCase(fetchHomeCategories.pending, (state)=>{
                state.loading = true;
                state.error = null;
                state.categoryUpdated = false;
            })
            .addCase(fetchHomeCategories.fulfilled, (state, action)=>{
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchHomeCategories.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export default homeCategorySlice.reducer;
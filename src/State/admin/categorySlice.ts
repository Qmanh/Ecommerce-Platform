import { Category } from '@mui/icons-material';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../config/Api';

interface Category{
    id?:number,
    name: string,
    categoryId:string,
    level:number,
    parentCategoryId:string | null,
    parentCategory:Category,
}
interface CategoryState{
    category:Category[],
    category2:Category[],
    category3:Category[],
    totalPage:number,
    loading: boolean,
    error:string | null,
}

const initialState: CategoryState = {
    category:[],
    category2:[],
    category3:[],
    totalPage:0,
    loading: false,
    error: null,
};

export const createCategory = createAsyncThunk("category/createCategory",
    async (category: any, {rejectWithValue}) => {
        try {
            const response = await api.post("/admin/category", category, {
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${localStorage.getItem("jwt")||""}`
                }
            })
            console.log("create category ", response.data);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create new category");
        }
    }
)

export const getAllCategories = createAsyncThunk<any,any>(
    "category/getAllCategories",
    async (params, {rejectWithValue}) =>{
        try {
            const response = await api.get("/admin/category",{
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")||""}`
                },
                params:{
                    ...params,
                    pageNumber:params.pageNumber || 0,
                    level: params.level
                }
            })
            console.log("get all category ", response.data);
            return response.data;
        } catch (error:any) {
            console.log("error ", error.response);
            return rejectWithValue(error.response?.data?.message || "Failed to get categories")
        }
    }
)

export const getAllCategoriesCustomer = createAsyncThunk<any>(
    "category/getAllCategoriesCustomer",
    async (_, {rejectWithValue}) =>{
        try {
            const response = await api.get("/customer/category",{
                params:{
                    level: 1
                }
                
            })
            console.log("get all category ", response.data);
            return response.data;
        } catch (error:any) {
            console.log("error ", error.response);
            return rejectWithValue(error.response?.data?.message || "Failed to get categories")
        }
    }
)
export const getAllCategoriesCustomer2 = createAsyncThunk<any>(
    "category/getAllCategoriesCustomer2",
    async (_, {rejectWithValue}) =>{
        try {
            const response = await api.get("/customer/category",{
                params:{
                    
                    level: 2
                }
                
            })
            console.log("get all category2 ", response.data);
            return response.data;
        } catch (error:any) {
            console.log("error ", error.response);
            return rejectWithValue(error.response?.data?.message || "Failed to get categories")
        }
    }
)
export const getAllCategoriesCustomer3 = createAsyncThunk<any>(
    "category/getAllCategoriesCustomer3",
    async (_, {rejectWithValue}) =>{
        try {
            const response = await api.get("/customer/category",{
                params:{
                    
                    level:3
                }
                
            })
            console.log("get all category3 ", response.data);
            return response.data;
        } catch (error:any) {
            console.log("error ", error.response);
            return rejectWithValue(error.response?.data?.message || "Failed to get categories")
        }
    }
)

const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder


            .addCase(getAllCategories.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action)=>{
                state.loading = false;
                state.category= action.payload.content
                state.totalPage = action.payload.totalPages
            })
            .addCase(getAllCategories.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllCategoriesCustomer.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategoriesCustomer.fulfilled, (state, action)=>{
                state.loading = false;
                state.category= action.payload

            })
            .addCase(getAllCategoriesCustomer.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(getAllCategoriesCustomer2.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategoriesCustomer2.fulfilled, (state, action)=>{
                state.loading = false;
                state.category2= action.payload

            })
            .addCase(getAllCategoriesCustomer2.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(getAllCategoriesCustomer3.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategoriesCustomer3.fulfilled, (state, action)=>{
                state.loading = false;
                state.category3= action.payload

            })
            .addCase(getAllCategoriesCustomer3.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

    }
})

export default categorySlice.reducer;
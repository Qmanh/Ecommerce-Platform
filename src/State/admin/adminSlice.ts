import { getAllCoupons } from './adminCouponSlice';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { HomeCategory, HomeCategoryUpdate, HomeData, Size } from "../../types/HomeCategoryTypes";
import { User } from '../../types/userTypes';
import { AccountStatus } from '../../types/SellerType';

const API_URL = '/admin';

export const updateHomeCategory = createAsyncThunk<HomeCategory, {id: number; data:HomeCategoryUpdate}
> (
    'homeCategory/updateHomeCategory',
    async ({id, data}, {rejectWithValue}) =>{
        try {
            const response = await api.patch(`${API_URL}/home-category/${id}`,data,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")||""}`
                }
            });
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
            const response = await api.get(`${API_URL}/home-category`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")||""}`
                }
            });
            console.log("categories ", response.data)
            return response.data
        } catch (error:any) {
            console.log("error ", error.response)
            return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
        }
    }
)
export const fetchAllSize = createAsyncThunk<any>(
    "homeCategory/fetchAllSize",
    async (_, {rejectWithValue}) =>{
        try {
            const response = await api.get(`${API_URL}/product/size`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")||""}`
                }
            });
            console.log("sizes ", response.data)
            return response.data
        } catch (error:any) {
            console.log("error ", error.response)
            return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
        }
    }
)

export const getAllCustomer = createAsyncThunk<any,any>("/homeCategory/getAllCustomer",
    async(params, {rejectWithValue}) => {
        
        try {
            const response = await api.get("/admin/customer/get-all",{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("jwt")||""}`,
                },
                params:{
                    ...params
                }
            })
            console.log("params: ",params)
            console.log("Get All Customer ", response.data)
            return response.data
            
        } catch (error) {
            console.log("error - - -", error)
        }
    }
)

export const updateAccountUserStatus = createAsyncThunk<any,
    {jwt: String,email:String, accountStatus: AccountStatus}
> (
    'homeCategory/updateAccountStatus',
    async ({jwt,email, accountStatus}, {rejectWithValue}) =>{
        try {
            const response = await api.patch(`/admin/${email}/update-status/${accountStatus}`,null,{
                headers: {Authorization: `Bearer ${jwt}`}
            })
            console.log("user update statusAccount ", response.data)
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const fetchAllSizeActive = createAsyncThunk<any>(
    "homeCategory/fetchAllSizeActive",
    async (_, {rejectWithValue}) =>{
        try {
            const response = await api.get(`${API_URL}/product/size/get-all-seller`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")||""}`
                }
            });
            console.log("sizes ", response.data)
            return response.data
        } catch (error:any) {
            console.log("error ", error.response)
            return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
        }
    }
)

export const createSize = createAsyncThunk<any, any
>("homeCategory/createSize", async(size,{rejectWithValue})=>{
    try {
       
        const response = await api.post(`${API_URL}/product/size`,size,{
            headers:{Authorization:`Bearer ${localStorage.getItem("jwt")||""}`}
        })
        console.log("created sized ", response.data);
        return response.data;
    } catch (error:any) {
        return rejectWithValue(error.response?.data || "Failed to create coupon");
    }
})

export const deleteSize = createAsyncThunk<any, any
>("homeCategory/deleteSize", async(name,{rejectWithValue})=>{
    try {
        
        const response = await api.delete(`${API_URL}/product/size/${name}`,{
            headers:{Authorization:`Bearer ${localStorage.getItem("jwt")||""}`}
        })
        console.log("message ", response.data);
        return response.data;
    } catch (error:any) {
        return rejectWithValue(error.response?.data || "Failed to delete size");
    }
})



interface HomeCategoryState {
    categories: HomeCategory[];
    sizes: Size[];
    users:User[]
    loading: boolean;
    error: string | null;
    categoryUpdated: boolean;
    message:string | null;
}

const initialState: HomeCategoryState = {
    categories:[],
    sizes:[],
    users:[],
    loading: false,
    error: null,
    categoryUpdated: false,
    message:null,
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

        builder
            .addCase(fetchAllSize.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllSize.fulfilled, (state, action)=>{
                state.loading = false;
                state.sizes = action.payload;
            })
            .addCase(fetchAllSize.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            //for seller add product
            .addCase(fetchAllSizeActive.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllSizeActive.fulfilled, (state, action)=>{
                state.loading = false;
                state.sizes = action.payload;
            })
            .addCase(fetchAllSizeActive.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createSize.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(createSize.fulfilled, (state, action)=>{
                state.loading = false;
                state.sizes.push(action.payload);
            })

            .addCase(createSize.rejected, (state, action)=>{
                state.loading = false;
                state.error = String(action.payload) || "Failed to apply coupon";
                
            })

            .addCase(deleteSize.fulfilled, (state, action)=>{
                state.loading = false;
                state.message = action.payload;
            })

            ///get all customer
            builder.addCase(getAllCustomer.pending,(state)=>{
                state.loading = true;
            })
            .addCase(getAllCustomer.fulfilled, (state, action)=>{
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllCustomer.rejected, (state, action)=>{
                state.loading = false;
                state.error = String(action.payload) || "Failed to get all customer";
            })
    }
})

export default homeCategorySlice.reducer;
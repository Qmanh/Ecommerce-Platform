import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupon, CouponState } from "../../types/CouponTypes";
import { api } from "../../config/Api";


const API_URL = "/admin/coupons";

const initialState: CouponState = {
    coupons:[],
    cart:null,
    loading:false,
    error:null ,
    couponCreated: false,
    couponApplied: false,
};

export const createCoupon = createAsyncThunk<Coupon, {coupon: any; jwt: string}, {rejectValue:string}
>("coupon/createCoupon", async({coupon,jwt},{rejectWithValue})=>{
    try {
        const response = await api.post(`${API_URL}/create`,coupon,{
            headers:{Authorization:`Bearer ${jwt}`}
        })
        console.log("created coupon ", response.data);
        return response.data;
    } catch (error:any) {
        return rejectWithValue(error.response?.data || "Failed to create coupon");
    }
})

export const getAllCoupons = createAsyncThunk<any,any>("coupon/getAllCoupons",
     async(jwt,{rejectWithValue})=>{
    try {
        const response = await api.get(`${API_URL}/all`,{
            headers:{Authorization:`Bearer ${jwt}`}
        })
        console.log("get all coupons: ", response.data);
        return response.data;
    } catch (error:any) {
        return rejectWithValue(error.response?.data || "Failed to get all coupon");
    }
})

export const updateActiveCoupon = createAsyncThunk<any,{jwt:string; id:number}>("coupon/updateActiveCoupon",
    async({jwt,id},{rejectWithValue})=>{
   try {
       const response = await api.patch(`${API_URL}/update-active/${id}`,{
           headers:{Authorization:`Bearer ${jwt}`}
       })
       console.log("update coupon: ", response.data);
       return response.data;
   } catch (error:any) {
       return rejectWithValue(error.response?.data || "Failed to update coupon");
   }
})

export const deleteCoupon = createAsyncThunk<any,{jwt:string; id:number}>("coupon/deleteCoupon",
    async({jwt,id},{rejectWithValue})=>{
   try {
       const response = await api.delete(`${API_URL}/delete/${id}`,{
           headers:{Authorization:`Bearer ${jwt}`}
       })
       console.log("update coupon: ", response.data);
       return response.data;
   } catch (error:any) {
       return rejectWithValue(error.response?.data || "Failed to delete coupon");
   }
})
const adminCouponSlice = createSlice({
    name:"counpons",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
            .addCase(getAllCoupons.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCoupons.fulfilled, (state, action)=>{
                state.loading = false;
                state.coupons = action.payload;
            })

            .addCase(getAllCoupons.rejected, (state, action)=>{
                state.loading = false;
                state.error = String(action.payload) || "Failed to apply coupon";
                state.couponApplied = false;
            })


            .addCase(createCoupon.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(createCoupon.fulfilled, (state, action)=>{
                state.loading = false;
                state.coupons.push(action.payload);
                state.couponCreated = true;
            })

            .addCase(createCoupon.rejected, (state, action)=>{
                state.loading = false;
                state.error = String(action.payload) || "Failed to apply coupon";
                state.couponCreated = false;
            })

            .addCase(deleteCoupon.rejected,(state,action)=>{
                state.loading = false;
                state.error = String(action.payload) || "Failed to delete coupon";
            })
    }
})
export default adminCouponSlice.reducer;
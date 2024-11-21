import { Seller } from './../../types/SellerType';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";


export const fetchSellerProfile = createAsyncThunk<any,any>("/sellers/fetchSellerProfile",
    async(jwt, {rejectWithValue}) => {
        try {
            const response = await api.get("/sellers/profile",{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            })
            console.log("fetch seller profile ", response.data)
            return response.data
            
        } catch (error) {
            console.log("error - - -", error)
        }
    }
)

export const createSeller = createAsyncThunk<any, any>("/auth/create-seller",
    async(signupRequest, {rejectWithValue}) => {
        try {
            const response = await api.post("/sellers/create",signupRequest)
            console.log("login otp ", response.data)
            return response.data;
        } catch (error) {
            console.log("error - - -", error)
        }
    }
)

interface SellerState{
    sellers:any[],
    jwt:any,
    selectedSeller:any,
    profile:any,
    report:any,
    loading:boolean,
    error:any,
}

const initialState:SellerState = {
    sellers:[],
    jwt:null,
    selectedSeller:null,
    profile:null,
    report:null,
    loading:false,
    error:null,
}

const sellerSlice = createSlice({
    name: "sellers",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(fetchSellerProfile.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchSellerProfile.fulfilled, (state, action)=>{
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(fetchSellerProfile.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(createSeller.fulfilled,(state,action)=>{
            state.loading = false;
            state.jwt = action.payload;
        })
    }
})

export default sellerSlice.reducer;
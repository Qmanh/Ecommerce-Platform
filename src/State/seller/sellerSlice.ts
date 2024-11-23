import { AccountStatus, Seller } from './../../types/SellerType';
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


export const getAllSeller = createAsyncThunk<any,any>("/sellers/getAllSeller",
    async(params, {rejectWithValue}) => {
        
        try {
            const response = await api.get("/sellers/get-all",{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
                params:{
                    ...params
                }
            })
            console.log("params: ",params)
            console.log("Get All Seller ", response.data)
            return response.data
            
        } catch (error) {
            console.log("error - - -", error)
        }
    }
)

export const updateAccountSellerStatus = createAsyncThunk<any,
    {jwt: string,sellerId:Number, accountStatus: AccountStatus}
> (
    'sellers/updateAccountStatus',
    async ({jwt,sellerId, accountStatus}, {rejectWithValue}) =>{
        try {
            const response = await api.patch(`/sellers/${sellerId}/update-status/${accountStatus}`,null,{
                headers: {Authorization: `Bearer ${jwt}`}
            })
            console.log("seller update statusAccount ", response.data)
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
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

        builder.addCase(getAllSeller.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getAllSeller.fulfilled, (state, action)=>{
            state.loading = false;
            state.sellers = action.payload;
        })
        .addCase(getAllSeller.rejected, (state, action)=>{
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
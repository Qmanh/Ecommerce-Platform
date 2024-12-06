import { AccountStatus, Seller } from './../../types/SellerType';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const sendLoginSignupOtp = createAsyncThunk("/sellers/sendLoginSignupOtp",
    async({email}:{email:string}, {rejectWithValue}) => {
        try {
            const response = await api.post("/auth/sent/login-signup-otp",{email})
            console.log("login otp ", response)
        } catch (error) {
            console.log("error - - -", error)
        }
    }
)

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

export const getTotalEarning = createAsyncThunk<any>("/auth/getTotalEarnings",
    async(_, {rejectWithValue}) => {
        try {
            const response = await api.get("/sellers/total-earnings",{
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")||""}`}
            })
            console.log("totalEarning:  ", response.data)
            return response.data;
        } catch (error) {
            console.log("error - - -", error)
        }
    }
)

interface sellerReport{
    totalEarning: number,
    totalOrders: number,
    totalCancelOrders: number
}

interface SellerState{
    sellers:any[],
    totalEarning:sellerReport,
    sentOtp:boolean,
    jwt:any,
    selectedSeller:any,
    profile:any,
    report:any,
    loading:boolean,
    error:any,
}

const initialState:SellerState = {
    sellers:[],
    totalEarning:{totalEarning:0,totalCancelOrders:0,totalOrders:0},
    sentOtp:false,
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
        builder.addCase(sendLoginSignupOtp.pending,(state)=>{
            state.loading = true;
        })

        builder.addCase(sendLoginSignupOtp.fulfilled,(state)=>{
            state.loading = false;
            state.sentOtp = true;
        })
        builder.addCase(sendLoginSignupOtp.rejected,(state)=>{
            state.loading = false;
        })

        builder.addCase(getTotalEarning.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getTotalEarning.fulfilled, (state, action:PayloadAction<sellerReport>)=>{
            state.loading = false;
            state.totalEarning = action.payload;
        })
        .addCase(getTotalEarning.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        
    }
})

export default sellerSlice.reducer;
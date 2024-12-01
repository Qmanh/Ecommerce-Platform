import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../config/Api";
import { Address, User } from "../types/userTypes";
import { useNavigate } from "react-router-dom";
import { Seller } from "../types/SellerType";


export const sendLoginSignupOtp = createAsyncThunk("/auth/sendLoginSignupOtp",
    async({email}:{email:string}, {rejectWithValue}) => {
        try {
            const response = await api.post("/auth/sent/login-signup-otp",{email})
            console.log("login otp ", response)
        } catch (error) {
            console.log("error - - -", error)
        }
    }
)
export const signin = createAsyncThunk<any, any>("/auth/signin",
    async(loginRequest, {rejectWithValue}) => {
        try {
            const response = await api.post("/auth/signing",loginRequest)
            console.log("login otp ", response.data)
            localStorage.setItem("jwt", response.data.jwt)
            localStorage.setItem("role",response.data.role)
            return response.data;
        } catch (error) {
            console.log("error - - -", error)
            return null;
        }
    }
)

export const signup = createAsyncThunk<any, any>("/auth/signup",
    async(signupRequest, {rejectWithValue}) => {
        try {
            const response = await api.post("/auth/signup",signupRequest)
            console.log("login otp ", response.data)
            localStorage.setItem("jwt", response.data.jwt)
            return response.data.jwt;
        } catch (error) {
            console.log("error - - -", error)
        }
    }
)

export const fetchUserProfile = createAsyncThunk<any, any>("/auth/fetchUserProfile",
    async(jwt, {rejectWithValue}) => {
        try {
            const response = await api.get("/api/users/profile",{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            })
            console.log("user profile ", response.data)
            return response.data;
        } catch (error) {
            console.log("error - - -", error)
        }
    }
)

export const deleteAddress = createAsyncThunk<any,
    { id:number; jwt: string }
>("orders/createOrder", async ({ id, jwt }, { rejectWithValue }) => {
    try {
        const response = await api.delete(`/api/users/address/${id}`, {
            headers: { Authorization: `Bearer ${jwt}` },

        });
        console.log("delete address ", response.data);
        return response.data;
    } catch (error: any) {
        console.log("error ", error.response);
        return rejectWithValue("Failed to create order");
    }
});

export const fetchUserAddress = createAsyncThunk<any, any>("/auth/fetchUserAddress",
    async(jwt, {rejectWithValue}) => {
        try {
            const response = await api.get("/api/users/address",{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            })
            console.log("user address ", response.data)
            return response.data;
        } catch (error) {
            console.log("error - - -", error)
        }
    }
)

export const logout = createAsyncThunk<any,any>("/auth/logout",
    async(navigate, {rejectWithValue})=>{
        try {
            localStorage.clear()
            console.log("logout success")
            navigate("/")
        } catch (error) {
            console.log("error - - -", error);
        }
    }
)

export interface AuthState{
    jwt:string | null,
    otpSent:boolean,
    isLoggedIn:boolean,
    user:User | null,
    loading: boolean,

}
const initialState:AuthState = {
    jwt:null,
    otpSent:false,
    isLoggedIn:false,
    user:null,
    loading:false,

}


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{

        builder.addCase(sendLoginSignupOtp.pending,(state)=>{
            state.loading = true;
        })

        builder.addCase(sendLoginSignupOtp.fulfilled,(state)=>{
            state.loading = false;
            state.otpSent = true;
        })

        builder.addCase(sendLoginSignupOtp.rejected,(state)=>{
            state.loading = false;
        })

        builder.addCase(signin.fulfilled,(state,action)=>{
            state.jwt = action.payload
            state.isLoggedIn = true
        })

        builder.addCase(signup.fulfilled,(state,action)=>{
            state.jwt = action.payload
            state.isLoggedIn = true
        })
        
        builder.addCase(fetchUserProfile.fulfilled, (state, action)=>{
            state.user = action.payload
            state.isLoggedIn = true
        })

        builder.addCase(fetchUserAddress.fulfilled, (state, action)=>{
            state.user = action.payload
            state.isLoggedIn = true
        })

        builder.addCase(logout.fulfilled, (state)=>{
            state.jwt = null
            state.isLoggedIn = false
            state.user = null
        })

    }
})

export default authSlice.reducer;
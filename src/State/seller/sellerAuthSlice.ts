import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../config/Api"
import { Seller } from "../../types/SellerType"

export const sellerLogin = createAsyncThunk<any, any>("/auth/signin",
    async(loginRequest, {rejectWithValue}) => {
        try {
            const response = await api.post("/sellers/login",loginRequest)
            console.log("login otp ", response.data)
            const jwt = response.data.jwt;
            localStorage.setItem("jwt", jwt);
            localStorage.setItem("role",response.data.role);
            return response.data.jwt;
        } catch (error) {
            console.log("error - - -", error)
        }
    }
)

export const verifyEmail = createAsyncThunk<any, any>("/auth/verify",
    async(otp, {rejectWithValue}) => {
        try {
            console.log("hahah: ",otp)
            const response = await api.patch(`/sellers/verify/${otp}`)
            const jwt = response.data.jwt;
            localStorage.setItem("jwt", jwt);
            console.log("verify: ", response.data)
            return response.data;
        } catch (error) {
            console.log("error - - -", error)
        }
    }
)


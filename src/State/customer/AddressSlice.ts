import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Address } from "../../types/userTypes";
import { api } from "../../config/Api";


export interface AddressState {
    address: Address[];
    loading: boolean;
    error: string | null;

}

const initialState: AddressState = {
    address: [],
    loading: false,
    error: null,
};

const API_URL = "/api/address";

export const createAddress = createAsyncThunk<any,
    { address: Address; jwt: string }
>("address/createAddress", async ({ address, jwt }, { rejectWithValue }) => {
    try {
        const response = await api.post(API_URL, address, {
            headers: { Authorization: `Bearer ${jwt}` },

        });
        console.log("order created ", response.data);
        return response.data;
    } catch (error: any) {
        console.log("error ", error.response);
        return rejectWithValue("Failed to create order");
    }
});

export const getAllAddressByUser = createAsyncThunk<any,any>("address/getAllAddress",
     async ( jwt, { rejectWithValue }) => {
    try {
        const response = await api.get(API_URL, {
            headers: { Authorization: `Bearer ${jwt}` },

        });
        console.log("order created ", response.data);
        return response.data;
    } catch (error: any) {
        console.log("error ", error.response);
        return rejectWithValue("Failed to create order");
    }
});


const addressSlice = createSlice({
    name: "addresses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch all address by user
            .addCase(getAllAddressByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAddressByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.address = action.payload;
            })
            .addCase(getAllAddressByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            //  // fetch address by id
            //  .addCase(getAddressById.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(getAddressById.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.address = action.payload;
            // })
            // .addCase(getAddressById.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload as string;
            // })
    }
});

export default addressSlice.reducer;
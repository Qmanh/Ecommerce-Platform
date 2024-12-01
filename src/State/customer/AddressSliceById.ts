import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Address } from "cluster";

export const getAddressById = createAsyncThunk<any,any>("orders/createOrder",
    async ( {id,jwt}, { rejectWithValue }) => {
   try {
       const response = await api.get(`api/address/user/${id}`,{
        headers: { Authorization: `Bearer ${jwt}` },
       })
       console.log("address by id ", response.data);
       return response.data;
   } catch (error: any) {
       console.log("error ", error.response);
       return rejectWithValue("Failed to create order");
   }
});

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

const addressSliceById = createSlice({
    name: "addressById",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

             // fetch address by id
             .addCase(getAddressById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAddressById.fulfilled, (state, action) => {
                state.loading = false;
                state.address = action.payload;
            })
            .addCase(getAddressById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export default addressSliceById.reducer;
import { OrderStatus } from './../../types/OrderTypes';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../types/OrderTypes";
import { api } from "../../config/Api";

interface SellerOrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: SellerOrderState = {
    orders: [],
    loading: false,
    error: null,
};

export const fetchSellerOrders = createAsyncThunk<Order[], string>(
    'sellerOrders/fetchSellerOrders',
    async (jwt, {rejectWithValue}) =>{
        try {
            const response = await api.get('/api/seller/orders', {
                headers: {Authorization :`Bearer ${jwt}`}
            })
            console.log("fetch seller orders ", response.data)
            return response.data;
        } catch (error:any) {
            console.log("error ", error.response);
            return rejectWithValue(error.response.data);
        }
    }
)

export const updateOrderStatus = createAsyncThunk<Order,
    {jwt: string, orderId: number, orderStatus: OrderStatus}
> (
    'sellerOrders/updateOrderStatus',
    async ({jwt, orderId, orderStatus}, {rejectWithValue}) =>{
        try {
            const response = await api.patch(`/api/seller/orders/${orderId}/status/${orderStatus}`,null,{
                headers: {Authorization: `Bearer ${jwt}`}
            })
            console.log("order status updated ", response.data)
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const deleteOrder = createAsyncThunk<any, {jwt:string, orderId:number}>(
    'sellerOrders/deleteOrder',
    async ({jwt, orderId}, {rejectWithValue}) =>{
        try {
            const response = await api.delete(`/api/seller/orders/${orderId}/delete`,{
                headers: {Authorization: `Bearer ${jwt}`}
            })
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
)

const sellerOrderSlice = createSlice({
    name: 'sellerOrders',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchSellerOrders.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSellerOrders.fulfilled, (state, action: PayloadAction<Order[]>)=>{
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchSellerOrders.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            // update
            .addCase(updateOrderStatus.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>)=>{
                state.loading = false;
                const index = state.orders.findIndex(order => order.id === action.payload.id);
                if(index !== -1){
                    state.orders[index] = action.payload;
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

             // delete
             .addCase(deleteOrder.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action)=>{
                state.loading = false;
                state.orders = state.orders.filter(order => order.id !== action.meta.arg.orderId)
            })
            .addCase(deleteOrder.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })


    }
})

export default sellerOrderSlice.reducer;
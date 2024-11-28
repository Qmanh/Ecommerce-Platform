import { OrderList, OrderStatus } from './../../types/OrderTypes';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../types/OrderTypes";
import { api } from "../../config/Api";

interface SellerOrderState {
    orders: Order[];
    loading: boolean;
    orderList:FetchSellerOrdersResponse;
    error: string | null;
    totalPageNumber: number;
}

const initialState: SellerOrderState = {
    orders: [],
    orderList:{orderDTOList:[], totalPageNumber:0},
    loading: false,
    error: null,
    totalPageNumber:0,
};

interface FetchSellerOrdersResponse {
    orderDTOList: Order[]; // Assuming orderDTOList contains an array of Order objects
    totalPageNumber: number;
}

export const fetchSellerOrders = createAsyncThunk<FetchSellerOrdersResponse, {jwt:string, params:any}>(
    'sellerOrders/fetchSellerOrders',
    async ({jwt,params}, {rejectWithValue}) =>{
        try {
            const response = await api.get('/api/seller/orders', {
                headers: {Authorization :`Bearer ${jwt}`},
                params:{
                    pageNumber:params.pageNumber
                }
            })
            console.log("fetch seller orders ", response.data.orderDTOList)
            const { orderDTOList, totalPageNumber } = response.data;

            return { orderDTOList, totalPageNumber };
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
            .addCase(fetchSellerOrders.fulfilled, (state, action: PayloadAction<FetchSellerOrdersResponse>)=>{
                state.loading = false;
                state.orderList = action.payload;
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
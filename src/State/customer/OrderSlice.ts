import { OrderStatus } from './../../types/OrderTypes';

import { PayloadAction } from './../../../node_modules/@reduxjs/toolkit/src/createAction';
import { Address } from './../../types/userTypes';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { api } from "../../config/Api";
import { Order, OrderItem, OrderState } from "../../types/OrderTypes";
import axios from 'axios';

const initialState: OrderState = {
    orders: [],
    orderItem: null,
    currentOrder: null,
    paymentOrder: null,
    loading: false,
    error: null,
    orderCanceled: false,
    orderStatus:null,
};

const API_URL = "/api/orders";

export const fetchUserOrderHistory = createAsyncThunk<Order[], string>(
    "orders/fetchUserOrderHistory",
    async (jwt, {rejectWithValue}) => {
        try {
            const response = await api.get(`${API_URL}/user`,{
                headers: {Authorization:`Bearer ${jwt}`},
            });
            console.log("order history fetched ", response.data);
            return response.data;
        } catch (error:any) {
            console.log("error ", error.response);
            return rejectWithValue(
                error.response.data.error || "Failed to fetch order history"
            )
        }
    }
);

export const fetchOrderById = createAsyncThunk<Order, 
    {orderId: number, jwt:string}
>("orders/fetchOrderById", async ({orderId, jwt},{rejectWithValue})=>{
    try {
        const response = await api.get(`${API_URL}/${orderId}`,{
            headers:{Authorization: `Bearer ${jwt}`},
        });
        console.log("order fetched ", response.data);
        return response.data;
    } catch (error:any) {
        console.log("error ", error.response)
        return rejectWithValue("Failed to fetch order")
    }
});

export const createOrder = createAsyncThunk<any,
    {address: any; jwt: string, paymentGateway: string}
>("orders/createOrder", async({address, jwt, paymentGateway}, {rejectWithValue})=>{
    try {
        const response = await api.post(API_URL, address,{
            headers: {Authorization: `Bearer ${jwt}`},
            params: {paymentMethod:paymentGateway}
        });
        console.log("order created ", response.data);
        if(response.data.payment_link_url){
            window.location.href = response.data.payment_link_url
        }
        return response.data;
    } catch (error:any) {
        console.log("error ", error.response);
        return rejectWithValue("Failed to create order");
    }
});

export const fetchOrderItemById = createAsyncThunk<OrderItem,
    {orderItemId: number; jwt:string}
>("orders/fetchOrderItemById", async({orderItemId, jwt},{rejectWithValue})=>{
    try {
        const response = await api.get(`${API_URL}/item/${orderItemId}`,{
            headers:{Authorization:`Bearer ${jwt}`},
        })
        console.log("order item fetched ", response.data)
        return response.data;
    } catch (error:any) {
        console.log("error ", error.response);
        return rejectWithValue("Failed to create order")
    }
});

export const paymentSuccess = createAsyncThunk<any,
    {paymentId: number, jwt:string, vnp_Amount:string, vnp_CardType:string, vnp_PayDate:string},{rejectValue: string}
>('/orders/paymentSuccess', async({paymentId, jwt, vnp_Amount, vnp_CardType, vnp_PayDate},{rejectWithValue})=>{
    try {
        const response = await api.get(`/api/payment/${paymentId}`,{
            headers: {Authorization:`Bearer ${jwt}`},
            params: {vnp_Amount, vnp_CardType, vnp_PayDate}
        });
        console.log("payment success ",response.data)
        return response.data;
    } catch (error:any) {
        console.log("error ", error.response.data.message)
        return rejectWithValue('Failed to process payment')
    }
});

export const cancelOrder = createAsyncThunk<Order, any>(
    'orders/cancelOrder',
    async (orderId, {rejectWithValue}) => {
        try {
            const response = await api.put(`${API_URL}/${orderId}/cancel`,{},{
                headers:{ Authorization:`Bearer ${localStorage.getItem("jwt")}`}
            })
            console.log("cancel order ", response.data)
            return response.data;
        } catch (error:any) {
            console.log("error ", error.response)
            if(axios.isAxiosError(error)&& error.response){
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An error occurred while cancelling the order');
        }
})

const orderSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(fetchUserOrderHistory.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.orderCanceled = false;
            })

            .addCase(fetchUserOrderHistory.fulfilled, (state, action: PayloadAction<Order[]>)=>{
                state.orders = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserOrderHistory.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            //Fetch order by Id
            .addCase(fetchOrderById.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<Order>)=>{
                state.currentOrder = action.payload;
                state.loading = false; 
            })
            .addCase(fetchOrderById.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            //Create a new order
            .addCase(createOrder.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action:PayloadAction<Order>)=>{
                state.paymentOrder = action.payload
                state.loading = false;
            })
            .addCase(createOrder.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            // fetch order item by id
            .addCase(fetchOrderItemById.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderItemById.fulfilled, (state, action)=>{
                state.loading = false;
                state.orderItem = action.payload;
            })
            .addCase(fetchOrderItemById.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            //payment success handler
            .addCase(paymentSuccess.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(paymentSuccess.fulfilled, (state, action)=>{
                state.loading = false;
                console.log("Payment successful: ", action.payload);
            })
            .addCase(paymentSuccess.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            //cancel order
            .addCase(cancelOrder.pending, (state)=>{
                state.loading = true;
                state.error = null;
                state.orderCanceled = false;
            })
            .addCase(cancelOrder.fulfilled, (state, action)=>{
                state.loading = false;
                state.orders = state.orders.map((order:any)=>
                    order.id === action.payload.id ? action.payload : order
                );
                state.orderCanceled = true;
                state.currentOrder = action.payload
            })
            .addCase(cancelOrder.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export default orderSlice.reducer;

// export const selectOrders = (state:RootState) => state.orders.orders;
// export const selectCurrentOrder = (state:RootState) => state.orders.currentOrder;
// export const selectPaymentOrder = (state:RootState) => state.orders.paymentOrder;
// export const selectOrdersLoading = (state:RootState) => state.orders.loading;
// export const selectOrdersError = (state:RootState) => state.orders.error;
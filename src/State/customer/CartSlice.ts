import { PayloadAction } from './../../../node_modules/@reduxjs/toolkit/src/createAction';
import { api} from './../../config/Api';
import { Cart, CartItem } from "../../types/CartTypes";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sumCartItemMrpPrice, sumCartItemSellingPrice } from '../../Utils/sumCartItemMrpPrice';
import { applyCoupon } from './CouponSlice';
import { RootState } from '../Store';

interface CartState {
    cart: Cart | null;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    cart: null,
    loading: false,
    error: null,
};

const API_URL = "/api/cart";
export const fetchUserCart = createAsyncThunk<Cart, string>(
    "cart/fetchUserCart",
    async (jwt: string, {rejectWithValue}) => {
        try {
            const response = await api.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Cart fetched ", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error ", error.response);
            return rejectWithValue("Failed to fetch user cart")
        }
    }
);

export interface AddItemRequest{
    productId: number | undefined,
    size: string | undefined,
    quantity: number | undefined,
    // color: string | undefined,
}

export const addItemToCart = createAsyncThunk<CartItem, 
    {jwt: string | null; request: AddItemRequest}
>("cart/addItemToCart", async({jwt, request}, {rejectWithValue})=>{
    try {
        const response = await api.put(`${API_URL}/add`, request, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        console.log("Cart added ", response.data);
        return response.data
    } catch (error:any) {
        console.log("error ", error.message)
        return rejectWithValue("Failed to add item to cart")
    }
});

export const deleteCartItem = createAsyncThunk<any,{jwt:string; cartItemId: number}>(
    "cart/deleteCartItem", async({jwt, cartItemId}, {rejectWithValue})=>{
        try {
            const response = await api.delete(`${API_URL}/item/${cartItemId}`,{
                headers: {Authorization:`Bearer ${jwt}`}
            });
            console.log("delete: ", response.data);
            return response.data
        } catch (error:any) {
            return rejectWithValue(
                error.response.data.message || "Failed to delete cart item"
            );
        }
});

export const updateCartItem = createAsyncThunk<any,{jwt:string | null; cartItemId: number, cartItem: any}>(
    "cart/updateCartItem", 
    async ({jwt, cartItemId, cartItem},{rejectWithValue})=>{
        try {
            const response = await api.put(`${API_URL}/item/${cartItemId}`,cartItem,
                {
                    headers: {Authorization:`Bearer ${jwt}`},
                }
            );
            console.log("updated cart: ",response.data)
            return response.data;
        } catch (error:any) {
            return rejectWithValue(
                error.response.data.message || "Failed to update cart item"
            );
        }
});

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        resetCartState: (state)=>{
            state.cart = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) =>{
        builder
            .addCase(fetchUserCart.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchUserCart.fulfilled, (state, action: PayloadAction<Cart>)=>{
                state.cart = action.payload
                state.loading = false;
            })

            .addCase(fetchUserCart.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addItemToCart.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })

            .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<CartItem>)=>{
                if(state.cart){
                    state.cart.cartItems.push(action.payload);
                }
                state.loading = false;
            })

            .addCase(addItemToCart.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            // information cart item

            .addCase(deleteCartItem.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            
            .addCase(deleteCartItem.fulfilled,(state, action)=>{
                if(state.cart){
                    state.cart.cartItems = state.cart.cartItems.filter(
                        (item:CartItem) => item.id !== action.meta.arg.cartItemId
                    );
                    const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItems || [])
                    const sellingPrice = sumCartItemSellingPrice(state.cart?.cartItems || [])
                    state.cart.totalSellingPrice = sellingPrice
                    state.cart.totalMrpPrice = mrpPrice
                }
                state.loading = false;
            })

            .addCase(deleteCartItem.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateCartItem.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })

            .addCase(updateCartItem.fulfilled, (state, action)=>{
                if(state.cart){
                    const index = state.cart.cartItems.findIndex(
                        (item:CartItem) => item.id === action.meta.arg.cartItemId
                    );
                    if(index !== -1){
                        state.cart.cartItems[index] = {
                            ...state.cart.cartItems[index],
                            ...action.payload,
                        };
                    }
                    const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItems || [])
                    const sellingPrice = sumCartItemSellingPrice(state.cart?.cartItems || [])
                    state.cart.totalSellingPrice = sellingPrice;
                    state.cart.totalMrpPrice = mrpPrice;
                }
            })

            .addCase(updateCartItem.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(applyCoupon.fulfilled, (state, action)=>{
                state.loading = false;
                state.cart = action.payload
            });
    },
});

export default cartSlice.reducer;
export const {resetCartState} = cartSlice.actions;

// export const selectCart = (state: RootState) => state.cart.cart;
// export const selectCartLoading = (state:RootState) => state.cart.loading;
// export const selectCartError = (state:RootState) => state.cart.error;
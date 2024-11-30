import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Product } from "../../types/ProductTypes";

interface FetchSellerProductsResponse {
    products: Product[]; // Assuming orderDTOList contains an array of Order objects
    totalPageNumber: number;
}

export const fetchSellerProducts = createAsyncThunk<FetchSellerProductsResponse, {jwt:string, params:any}>(
    "/sellerProduct/fetchSellerProducts",
        async ({jwt,params}, {rejectWithValue}) =>{
            try {
                const response = await api.get("/api/sellers/products",{
                    headers:{
                        Authorization: `Bearer ${jwt}`,
                    },
                    params:{
                        pageNumber:params.pageNumber
                    }
                })
                console.log("seller products", response.data)
                const {productList, totalPageNumber } = response.data;

                // return { productList, totalPageNumber };
                return response.data;
            } catch (error:any) {
                console.log("error - - -", error)
                return rejectWithValue(error.response.data);
            }
        }
)

export const createProduct = createAsyncThunk<Product,{request:any, jwt:string|null}>(
    "/sellerProduct/createProduct",
        async(args, {rejectWithValue}) => {
            const {request,jwt} = args;
            try {
                const response = await api.post("/api/sellers/products",request,{
                    headers:{
                        Authorization: `Bearer ${jwt}`,
                    },
                })
                console.log("product created ",response.data)
                return response.data
                
            } catch (error:any) {
                console.log("error - - -", error)
                return rejectWithValue(error.response.data);
            }
        }
)

export const updateProduct = createAsyncThunk<Product,{request:any, jwt:string|null, id:any}>(
    "/sellerProduct/updateProduct",
        async({id,request,jwt}, {rejectWithValue}) => {
            
            try {
                const response = await api.put(`/api/sellers/products/${id}`,request,{
                    headers:{
                        Authorization: `Bearer ${jwt}`,
                    },
                })
                console.log("product edited ",response.data)
                return response.data
                
            } catch (error:any) {
                console.log("error - - -", error)
                return rejectWithValue(error.response.data);
            }
        }
)
export const deleteProduct = createAsyncThunk<any,any>(
    "/sellerProduct/deleteProduct",
        async(id, {rejectWithValue}) => {
            try {
                const response = await api.delete(`/api/sellers/products/${id}`,{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                })
                console.log("delete product",response.data)
                return response.data
                
            } catch (error:any) {
                console.log("error - - -", error)
                return rejectWithValue(error.response.data);
            }
        }
)



interface SellerProductState{
    products:Product [];
    productList:FetchSellerProductsResponse,
    loading: boolean;
    error: string | null | undefined;
}

const initialState: SellerProductState = {
    products:[],
    productList:{products:[], totalPageNumber:0},
    loading: false,
    error: null
}

const sellerProductSlice = createSlice({
    name:"sellerProduct",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchSellerProducts.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(fetchSellerProducts.fulfilled,(state,action:PayloadAction<FetchSellerProductsResponse>)=>{
            state.loading = false;
            state.productList = action.payload;
        })
        builder.addCase(fetchSellerProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })

        builder.addCase(createProduct.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(createProduct.fulfilled,(state,action)=>{
            state.loading = false;
            state.products.push(action.payload);
        })
        builder.addCase(createProduct.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default sellerProductSlice.reducer;
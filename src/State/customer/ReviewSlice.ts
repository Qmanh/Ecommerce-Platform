import { Review } from './../../types/ReviewTypes';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
interface ReviewState {
    reviews: FetchReviewResponse;
    loading: boolean;
    error: string | null;
    totalPageNumber: number;
}

const initialState: ReviewState = {
    reviews: {reviews:[], totalPageNumber:0},
    loading: false,
    error: null,
    totalPageNumber:0,
};
interface FetchReviewResponse {
    reviews: Review[]
    totalPageNumber: number;
}

export const createReview = createAsyncThunk<Review,{request:any, jwt:string|null, productId:number}>(
    "/sellerProduct/createProduct",
        async({request,jwt,productId}, {rejectWithValue}) => {
            console.log("request: ", request);
            try {
                const response = await api.post(`/api/products/${productId}/reviews`,request,{
                    headers:{
                        Authorization: `Bearer ${jwt}`,
                    },
                })
                console.log("created reviews ",response.data)
                return response.data
                
            } catch (error:any) {
                console.log("error - - -", error)
                return rejectWithValue(error.response.data);
            }
        }
)

export const fetchAllReviewByProductId = createAsyncThunk<FetchReviewResponse, {productId:number,jwt:string, params:any}>(
    'reviews/fetchReviews',
    async ({jwt,params,productId}, {rejectWithValue}) =>{
        try {
            const response = await api.get(`api/products/${productId}/reviews`, {
                headers: {Authorization :`Bearer ${jwt}`},
                params:{
                    pageNumber:params.pageNumber
                }
            })
            console.log("fetch reviews ", response.data)
            const { reviews, totalPageNumber } = response.data;

            return { reviews, totalPageNumber };
        } catch (error:any) {
            console.log("error ", error.response);
            return rejectWithValue(error.response.data);
        }
    }
)


const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchAllReviewByProductId.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllReviewByProductId.fulfilled, (state, action:PayloadAction<FetchReviewResponse>)=>{
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchAllReviewByProductId.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })
}
})
export default reviewSlice.reducer
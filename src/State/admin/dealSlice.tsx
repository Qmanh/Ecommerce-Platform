import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { ApiResponse, Deal, DealState } from "../../types/DealTypes";
import { updateDecorator } from "typescript";

const initialState: DealState = {
    deals:[],
    loading: false,
    error: null,
    dealCreated: false,
    dealUpdated: false,
};

export const createDeal = createAsyncThunk("deals/createDeal",
    async (deal: any, {rejectWithValue}) => {
        try {
            const response = await api.post("/admin/deals", deal, {
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                }
            })
            console.log("create deal ", response.data);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create new deal");
        }
    }
)

export const getAllDeals = createAsyncThunk(
    "deals/getAllDeals",
    async (_, {rejectWithValue}) =>{
        try {
            const response = await api.get("/admin/deals",{
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            console.log("get all deal ", response.data);
            return response.data;
        } catch (error:any) {
            console.log("error ", error.response);
            return rejectWithValue(error.response?.data?.message || "Failed to create deal")
        }
    }
)

export const deleteDeal = createAsyncThunk<ApiResponse, {id:number}>(
    "deals/deleteDeal",
    async (id, {rejectWithValue}) =>{
        try {
            const response = await api.delete(`/admin/deals/${id}`,{
                headers: {Authorization:`Bearer ${localStorage.getItem("jwt")}`}
            })
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete deal");
        }
    }
)

const dealSlice = createSlice({
    name:'deal',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createDeal.pending, (state)=>{
                state.loading = true;
                state.error = null;
                state.dealCreated = false;
            })
            .addCase(createDeal.fulfilled, (state, action: PayloadAction<Deal>)=>{
                state.loading = false;
                state.deals.push(action.payload);
                state.dealCreated = true;
            })
            .addCase(createDeal.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllDeals.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllDeals.fulfilled, (state, action)=>{
                state.loading = false;
                state.deals = action.payload
            })
            .addCase(getAllDeals.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteDeal.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDeal.fulfilled, (state, action)=>{
                state.loading = false;
                if(action.payload.status){
                    state.deals = state.deals.filter(deal=> deal.id === action.meta.arg.id)
                }
            })

            .addCase(deleteDeal.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            // .addCase(updateDeal.pending, (state)=>{
            //     state.loading = true;
            //     state.error = null;
            //     state.dealUpdated=false;
            // })

            // .addCase(updateDeal.fulfilled, (state,action)=>{
            //     state.loading = false;
            //     state.dealUpdated = true;
            //     const index = state.deals.findIndex((deal)=> deal.id === action.payload.id);
            //     if(index !== -1){
            //         state.deals[index] = action.payload;
            //     }
            // })
            // .addCase(updateDeal.rejected, (state, action)=>{
            //     state.loading = false;
            //     state.error = action.payload as string;
            // })
    }
})

export default dealSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomeCategory, HomeData } from "../../types/HomeCategoryTypes";
import { api } from "../../config/Api";

export const fetchHomePageData = createAsyncThunk<any>(
    "home/fetchHomePageData",
    async (_, {rejectWithValue}) =>{
        try {
            const response = await api.get('/api/home-category',{
                params:{
                    
                    pageNumber: 0
                }
            });
            console.log("home page ", response.data)
            
            return response.data;
        } catch (error:any) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to getch homepage data';
            console.log("error ",errorMessage,error);
            return rejectWithValue(errorMessage);
        }
    }
)

export const createHomeCategories = createAsyncThunk<HomeData, HomeCategory[]>(
    "home/createHomeCategories",
    async (homeCategories, {rejectWithValue}) =>{
        try {
            const response = await api.post('admin/home/categories',homeCategories,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")||""}`
                }
            });
            console.log("home categories created -- ", response.data);
            return response.data;
        } catch (error:any) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to create home categories";
            console.log("error ", errorMessage, error);
            return rejectWithValue(errorMessage);
        }
    }
)

interface FetchAllHomeCategory {
    content: HomeCategory[],
    numberOfElements:number,
}

interface HomeState {
    homePageData: HomeData | null;
    homeCategories: HomeCategory[];
    loading: boolean;
    error: string | null;
}

const initialState: HomeState = {
    homePageData:null,
    homeCategories: [],
    loading: false,
    error: null,
}

const homeSlice = createSlice({
    name:'home',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
            .addCase(createHomeCategories.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(createHomeCategories.fulfilled, (state,action)=>{
                state.loading = false;
                state.homePageData = action.payload;
            })
            .addCase(createHomeCategories.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.error.message || 'Failed to create home categories';
            })

            .addCase(fetchHomePageData.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomePageData.fulfilled, (state,action)=>{
                state.loading = false;
                state.homePageData = action.payload;
            })
            .addCase(fetchHomePageData.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.error.message || 'Failed to create home categories';
            })
    }
})

export default homeSlice.reducer;
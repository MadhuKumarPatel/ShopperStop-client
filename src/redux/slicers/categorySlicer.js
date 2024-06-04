import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 
// import axios from "axios"
import { fetchDataFromApi } from '../../utils/api';

export const fetchCategory = createAsyncThunk("fetchCategory", async ()=>{
    const data = await fetchDataFromApi("/api/categories?populate=*")
    return data
})

export const categorySlice = createSlice({
    name:"category",
    initialState:{
        isLoading:false,
        data:null,
        error:false
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchCategory.pending, (state, action) =>{
            state.isLoading = true
        });
        builder.addCase(fetchCategory.fulfilled, (state, action) =>{
            state.isLoading = false
            state.data = action.payload
        });
        builder.addCase(fetchCategory.rejected, (state, action) =>{
            state.error = true
        });
    }
})

export default categorySlice.reducer;

export const selectCategories = (state) => state.category.data;
export const selectCategoryLoading = (state) => state.category.isLoading;
export const selectCategoryError = (state) => state.category.error;
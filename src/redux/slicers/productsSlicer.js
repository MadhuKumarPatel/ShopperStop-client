import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 
// import axios from "axios"
import { fetchDataFromApi } from '../../utils/api';

export const fetchProducts = createAsyncThunk("fetchProducts", async ()=>{
    const data = await fetchDataFromApi("/api/products?populate=*")
    return data
})

export const productsSlice = createSlice({
    name:"products",
    initialState:{
        isLoading:false,
        data:null,
        error:false
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchProducts.pending, (state, action) =>{
            state.isLoading = true
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) =>{
            state.isLoading = false
            state.data = action.payload
        });
        builder.addCase(fetchProducts.rejected, (state, action) =>{
            state.error = true
        });
    }
})

export default productsSlice.reducer;


export const selectProducts = (state) => {
    return state.products.data
};
export const selectProductsLoading = (state) => state.products.isLoading;
export const selectProductsError = (state) => state.products.error;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDataFromApi } from "../../utils/api";

export const fetchCategoryProducts = createAsyncThunk("fetchCategoryProducts", (id) => {
    // console.log(id);
    const data = fetchDataFromApi(`/api/products?populate=*&[filters][categories][id]=${id}`)
    // console.log(data);
    return data;
})

export const categoryProductsSlicer = createSlice({
    name:"categoryProducts",
    initialState:{
        isLoading:false,
        data:null,
        error:false
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchCategoryProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCategoryProducts.fulfilled, (state , action) => {
            state.isLoading = false
            state.data = action.payload
        });
        builder.addCase(fetchCategoryProducts.rejected, (state , action) => {
            state.error = true
        });
    }
});            

export default categoryProductsSlicer.reducer;

export const selectCategoryProducts = (state) => {
    // console.log(state);
    return state.categoryProducts.data;
}




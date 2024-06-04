import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDataFromApi } from "../../utils/api";

export const fetchSingleProduct = createAsyncThunk("fetchSingleProduct", (id) => {
    const data = fetchDataFromApi(`/api/products?populate=*&[filters][id]=${id}`)
    // console.log(data);
    return data;
})

export const singleProductSlicer = createSlice({
    name:"singleProduct",
    initialState:{
        isLoading:false,
        data:null,
        error:false
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchSingleProduct.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchSingleProduct.fulfilled, (state , action) => {
            state.isLoading = false
            state.data = action.payload
        });
        builder.addCase(fetchSingleProduct.rejected, (state , action) => {
            state.error = true
        });
    }
});            

export default singleProductSlicer.reducer;

export const selectSingleProduct = (state) => {
    // console.log(state);
    return state.singleProduct.data;
}




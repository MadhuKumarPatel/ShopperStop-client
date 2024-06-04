import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDataFromApi } from "../../utils/api";

export const fetchRelatedProducts = createAsyncThunk("fetchRelatedProducts", ({productId,categoryId}) => {
    const data = fetchDataFromApi(`/api/products?populate=*&filters[id][$ne]=${productId}&filters[categories][id]=${categoryId}&pagination[start]=0&pagination[limit]=4`)
    return data;
})

export const relatedProductsSlicer = createSlice({
    name:"relatedProducts",
    initialState:{
        isLoading:false,
        data:null,
        error:false
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchRelatedProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchRelatedProducts.fulfilled, (state , action) => {
            state.isLoading = false
            state.data = action.payload
        });
        builder.addCase(fetchRelatedProducts.rejected, (state , action) => {
            state.error = true
        });
    }
});            

export default relatedProductsSlicer.reducer;

export const selectRelatedProducts = (state) => {
    // console.log(state);
    return state.relatedProducts.data;
}




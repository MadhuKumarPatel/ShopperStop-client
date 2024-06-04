import { configureStore } from '@reduxjs/toolkit'; 
import  categoryReducer  from '../slicers/categorySlicer';
import  productsReducer  from '../slicers/productsSlicer';
import  categoryProductsReducer  from '../slicers/categoryProductsSlicer';
import singleProductReducer from '../slicers/singleProductSlicer';
import relatedProductsReducer from '../slicers/relatedProductsSlicer';
import cartReducer from '../slicers/cartSlicer';
import usersReducer from '../slicers/userSlice';


export const store = configureStore({
    reducer:{
        category: categoryReducer,
        products: productsReducer,
        categoryProducts: categoryProductsReducer,
        singleProduct: singleProductReducer,
        relatedProducts: relatedProductsReducer,
        cart: cartReducer,
        users: usersReducer,
    }
})
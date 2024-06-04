import { createSlice } from "@reduxjs/toolkit";

export const cartSlicer = createSlice({
    name:"cart",
    initialState:{
       cartItems:[],
       cartQuantity: 0,
       cartSubTotal:0,
    },
    reducers:{
        addToCart(state , action ){
        const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.product.id)
        if(itemIndex !== -1){
            state.cartItems[itemIndex].quantity = action.payload.quantity;
        }
        else{
            const tempProduct = {...action.payload.product, quantity:action.payload.quantity}
            state.cartItems.push(tempProduct);
        }
        },
        removeFromCart(state , action){
            const items = state.cartItems.filter((item) => item.id !== action.payload.id)
            state.cartItems = items
        },
        productQuantity(state , action){
        const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.product.id)
             if(action.payload.type === "inc"){
                state.cartItems[itemIndex].quantity +=1
             }
             else if(action.payload.type === "dec"){
                if(state.cartItems[itemIndex].quantity ===1) return;
                else{
                    state.cartItems[itemIndex].quantity -=1
                }
             }
        },
        cartSubTotal(state , action){
            let { totalamount , totalquantity} = state.cartItems.reduce(
                (cartTotal , cartItem) => {
                    const {attributes , quantity} = cartItem;
                    const itemTotal = attributes.price * quantity;

                    cartTotal.totalamount += itemTotal;
                    cartTotal.totalquantity += quantity;
                    return cartTotal;
                } , {
                    totalamount: 0,
                    totalquantity: 0,
                }
            );
            state.cartQuantity = totalquantity;
            state.cartSubTotal = totalamount;
        }
    },
});            

export const { addToCart , removeFromCart , productQuantity , cartSubTotal} = cartSlicer.actions;
export default cartSlicer.reducer;

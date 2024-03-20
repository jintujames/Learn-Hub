import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    cartId: '',
}

const cartSlice =createSlice({
    name:"cart",
    initialState,
    reducers:{
        updateCartCount:(state,action)=>{
            state.cartId =action.payload;
        }
    }
})

export const {updateCartCount} =cartSlice.actions;

export const selectCartCount =(state:any)=>state.cart.cartCount;


export default cartSlice.reducer
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupon } from "../models/Coupon";

interface CartStore{
    coupons: Coupon[];
}

const initState = {
    coupons: [],
}

export const cartSlice = createSlice({
    name:"cartSlice",
    initialState:initState,
    reducers:{
        addToCart: (state: CartStore, action: PayloadAction<Coupon>) => {
            state.coupons.push(action.payload);
        },
        removeFromCart: (state: CartStore, action: PayloadAction<Coupon>) =>{
            state.coupons = state.coupons.filter(
                (coupon) => coupon.id !== action.payload.id);
        }
    }
});

export const {addToCart,removeFromCart} = cartSlice.actions;
export const cartStore = configureStore({
    reducer:cartSlice.reducer
})
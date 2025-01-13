import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupon } from "../models/Coupon";

interface CouponStore{
    coupons: Coupon[];
    byCategory: Coupon[];
    maxPrice: number;
    
}

const initState = {
    coupons: [],
    byCategory: [],
    maxPrice: 0
}

export const couponsSlice = createSlice({
    name:"couponsSlice",
    initialState:initState,
    reducers:{
        addAllCoupons: (state: CouponStore, action: PayloadAction<Coupon[]>) => {
            state.coupons = action.payload
            for(let c of state.coupons){
                
                if(c.price>state.maxPrice){
                    state.maxPrice=c.price
                }
            }
            state.maxPrice=parseInt (state.maxPrice.toFixed(2));
        },
        getByCategory:(state: CouponStore , action: PayloadAction<string>) => {
            if(action.payload===""){
                state.byCategory = state.coupons;
            }else{
            state.byCategory = state.coupons.filter(coupon=>coupon.category.toString()===action.payload)
            }
        },
        getByPrice:(state: CouponStore,action: PayloadAction<number>) => {
            state.byCategory = state.byCategory.filter(
                (coupon) => coupon.price <= action.payload)
        }
    }
});

export const {addAllCoupons,getByCategory,getByPrice} = couponsSlice.actions;
export const couponStore = configureStore({
    reducer:couponsSlice.reducer
})
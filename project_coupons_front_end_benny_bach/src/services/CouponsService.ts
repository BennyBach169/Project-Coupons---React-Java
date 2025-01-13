import axios from "axios";
import { addAllCoupons, couponStore, getByCategory } from "../Redux/CouponStore";
import { Coupon } from "../models/Coupon";

class CouponsService{
    async getAllCoupons(){
        if(couponStore.getState().coupons.length===0){
            const response = (await axios.get<Coupon[]>("http://localhost:8080/coupons")).data;
            couponStore.dispatch(addAllCoupons(response))
            couponStore.dispatch(getByCategory(""))
        }else{
            return couponStore.getState().coupons;
        }
        
    }
}

const couponsService = new CouponsService;
export default couponsService;
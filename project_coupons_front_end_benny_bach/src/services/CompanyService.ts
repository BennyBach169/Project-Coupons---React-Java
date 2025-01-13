import axios from "axios";
import { Coupon } from "../models/Coupon";
import { Class } from "@mui/icons-material";
import { Company } from "../models/Company";
import { Category } from "../models/Category";

class ComoanyService{
    async getCompanyCoupons(token:string) {
        return  (await axios.get<Coupon[]>("http://localhost:8080/Company/coupons", { headers: { Authorization: "Bearer " + token } })).data
    }
    async getTotalSold(token:string) {
        return  (await axios.get<number>("http://localhost:8080/Company/coupons/soldtotal", { headers: { Authorization: "Bearer " + token } })).data
    }


    async deleteCoupon(token:string , id:number){
        return  (await axios.delete(`http://localhost:8080/Company/deleteOne/${id}`, { headers: { Authorization: "Bearer " + token } })).data
    }

    async updateCoupon(token:string , coupon:Coupon){
        return  (await axios.put(`http://localhost:8080/Company/update`,coupon, { headers: { Authorization: "Bearer " + token } })).data
    }

    async addCoupon(token: string, coupon: Coupon) {
        return (await axios.post(`http://localhost:8080/Company/add`, coupon, { headers: { Authorization: "Bearer " + token } })).data;
    }

    async CouponsByCategory(token: string, category: Category) {
        let categoryTemp =Category[category]
        return (await axios.get<Coupon[]>(`http://localhost:8080/Company/coupons/category/${categoryTemp}`, { headers: { Authorization: "Bearer " + token } })).data;
    }

    async CouponsByMaxPrice(token: string, maxPrice: number) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/Company/coupons/maxprice/${maxPrice}`, { headers: { Authorization: "Bearer " + token } })).data;
    }

    async getCompanyDetails(token: string) {
        return (await axios.get<Company>(`http://localhost:8080/Company`, { headers: { Authorization: "Bearer " + token } })).data;
    }


    
}



const companyService = new ComoanyService;
export default companyService;
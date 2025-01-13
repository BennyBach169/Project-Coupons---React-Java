import axios from "axios";
import { Coupon } from "../models/Coupon";
import { Category } from "../models/Category";

class CustomerService {
    async getCustomerCoupons(token: string) {
        return (await axios.get<Coupon[]>("http://localhost:8080/customers/coupons", {
            headers: { Authorization: "Bearer " + token }
        })).data;
    }

    async getCustomerCouponsByCategory(token: string, category: Category) {
        let categoryTemp = Category[category];
        return (await axios.get<Coupon[]>(`http://localhost:8080/customers/coupons/category/${categoryTemp}`, {
            headers: { Authorization: "Bearer " + token }
        })).data;
    }

    async getCustomerCouponsByMaxPrice(token: string, maxPrice: number) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/customers/coupons/maxprice/${maxPrice}`, {
            headers: { Authorization: "Bearer " + token }
        })).data;
    }

    async purchaseCoupon(token: string, coupon: Coupon) {
        return (await axios.post(`http://localhost:8080/customers/purchase`, coupon, {
            headers: { Authorization: "Bearer " + token }
        })).data;
    }
}

const customerService = new CustomerService();
export default customerService;

import { useEffect, useState } from "react";
import "./CheckOut.css";
import { Coupon } from "../../../models/Coupon";
import { cartStore, removeFromCart } from "../../../Redux/CartStore";
import { authStore } from "../../../Redux/AuthStore";
import customerService from "../../../services/CustomerService";
import { showErrorToast, showSuccessToast } from "../../ToastNotifications";





export function CheckOut(): JSX.Element {
    const [coupons,setCoupons] = useState<Coupon[]>([]);
    const [totalToPay,setTotalToPay] = useState<number>(0);

    useEffect(()=>{
        setCoupons(cartStore.getState().coupons);
        calcTotal(coupons)
    })

    function calcTotal(couponsToCalc:Coupon[]){
        let total:number=0;
        for(let c of coupons){
            total= total+c.price;
        }
        setTotalToPay(Number(total.toFixed(2)));
    }

    function handlePay(){
        const token = authStore.getState().token;
        if(token){
            let title :string="";
            for(let c of coupons){
                customerService.purchaseCoupon(token,c)
                .then(res=>{
                    showSuccessToast("Coupon: " + c.title +" ,purchased successfully")
                    cartStore.dispatch(removeFromCart(c));
                    setCoupons(cartStore.getState().coupons)
                })
                .catch(err=>showErrorToast(err.response.data +" Coupon: " +c .title ))
            }
        }
    }
    return (
        <div className="CheckOut">
            <div className="CheckOutContainer">
                <h2>CheckOut</h2>
                {coupons?.map(c=><div className="CouponsToBuy" key={c.id}>
                    <span>{c.title}</span>
                    <span>{c.category.toString()}</span>
                    <span>${c.price.toFixed(2)}</span>
                    <button onClick={()=> {cartStore.dispatch(removeFromCart(c));
                    setCoupons(cartStore.getState().coupons)
                    }
                    }>Remove</button>
                </div>)}
                <span>TOTAL: ${totalToPay}</span>
                <button onClick={handlePay} className="Pay">Pay</button>
            </div>
        </div>
    );
}

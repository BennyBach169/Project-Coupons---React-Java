import { Button } from "@mui/material";
import { Company } from "../../../models/Company";
import { Coupon } from "../../../models/Coupon";
import "./CouponAction.css";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthStore";
import { useEffect, useState } from "react";
import { addToCart, cartStore } from "../../../Redux/CartStore";
import { showErrorToast } from "../../ToastNotifications";

interface CouponProps {
  coupon: Coupon;
}

export function CouponAction(props: CouponProps): JSX.Element {
    let coupon : Coupon;
    coupon = props.coupon;
    let company: Company;
    company = coupon.company;
    const navigate = useNavigate();
    const [clientType, setClientType] = useState<string>("");

    useEffect(()=>{
      setClientType(authStore.getState().clientType);
      authStore.subscribe(() => {
        setClientType(authStore.getState().clientType);
      });
    })

    
    

    function handleBuyNow(){
      if(authStore.getState().token!==""){
        if(checkDups(coupon)){
          showErrorToast("This Coupon alreay exist in cart ,Each coupon can be prucahsed ones")
        }else{
          cartStore.dispatch(addToCart(coupon));
          navigate('/checkout')
        }
      }else{
        navigate('/login');
      }
    }

    function handleAddCart(){
      if(checkDups(coupon)){
        showErrorToast("This Coupon alreay exist in cart ,Each coupon can be prucahsed ones")
      }else{
        cartStore.dispatch(addToCart(coupon));
      }
    }

    function checkDups(dupCoupon: Coupon){
      let found : boolean = false;
      for(let c of cartStore.getState().coupons){
        if(c===dupCoupon){
          found = true;
        }
      }
      return found;
    }



  return (
    <div className="CouponAction">
        <div className="Details">
            <span style={{
                fontSize:'25px',
                fontStyle:'oblique'
            }}>Company: {company.name!.charAt(0).toUpperCase()+company.name!.slice(1)}</span>
            <span>{coupon.description}</span>
            <div className="Amount">
            <span style={{
                fontSize:'20px',
                marginTop:'0.5rem'
            }}>Availible: 
                <div style={{
                    fontSize:'25px'
                }}>{coupon.amount} left only</div></span>
                </div>
        </div>

        <div className="BuyContain">
      <div className="price">
        ${props.coupon.price.toFixed(2)}
        <br />
        <span className="priceBefore">
          ${((props.coupon.price / 100) * 20 + props.coupon.price).toFixed(2)}
        </span>
      </div>
      {(clientType !== "ADMINISTRATOR" && clientType !== "COMPANY") ?(
         <div className="Buy">
         <Button variant="contained" onClick={handleBuyNow}
            sx={{
               backgroundColor: 'var(--secondary-color)'
               
           }}>BUY NOW</Button>
           <Button variant="contained" onClick={handleAddCart}
            sx={{
               backgroundColor: 'var(--secondary-color)'
               
           }}>ADD TO CART</Button>
         </div>
      ):null}
      </div>
    </div>
  );
}

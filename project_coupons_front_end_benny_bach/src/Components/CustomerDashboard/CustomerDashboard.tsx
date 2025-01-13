import { useEffect, useState } from "react";
import "./CustomerDashboard.css";
import { Coupon } from "../../models/Coupon";
import customerService from "../../services/CustomerService";
import { authStore } from "../../Redux/AuthStore";
import { CouponCard } from "../CouponsPage/CouponCard/CouponCard";

import { get } from "http";
import { DashboardFilter } from "../DashboardFilter/DashboardFilter";
import { showErrorToast } from "../ToastNotifications";

export function CustomerDashboard(): JSX.Element {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    getData();
  },[]);

  function getData(){
    const token = authStore.getState().token;
    if (token) {
      customerService
        .getCustomerCoupons(token)
        .then((res) => setCoupons(res))
        .catch((err) => showErrorToast(err.response.data));
    }
  }

  

  function updateCouponState(coupons: Coupon[]){
    setCoupons(coupons);
  }


  return (
    <div className="CustomerDashboard">
        <h2 className="HeaderCustomer">Welcome Dear {authStore.getState().userName}, Your Coupons Are Ready To Use</h2>
        <DashboardFilter updateCouponState={updateCouponState} resetCoupons={getData}  clientType="customer"/>
        <div className="CoupContainer">
      {coupons?.map((c) => (
        <div key={c.id} className="card">
          <div className="card-inner">
            <div className="card-front">
                <div className="ContentCard">
              <p>{c.company.name}</p>
              <p>{c.price.toFixed(2)}$</p>
              <p>{c.category.toString()}</p>
              </div>
            </div>
            <div className="card-back">
                <div className="ContentCard">
              <p>Start Date: {c.startDate.toString()}</p>
              <p>End Date: {c.endDate.toString()}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

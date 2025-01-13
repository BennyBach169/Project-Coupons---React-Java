import { Coupon } from "../../../models/Coupon";
import { useEffect, useState } from "react";
import adminService from "../../../services/AdminService";
import { CouponCard } from "../CouponCard/CouponCard";
import "./Coupons.css"
import { Filter } from "../Filter/Filter";
import { addAllCoupons, couponStore } from "../../../Redux/CouponStore";
import { useSelector } from "react-redux";
import { set } from "react-hook-form";
import { subscribe } from "diagnostics_channel";

export function Coupons(): JSX.Element {
    const[coupons,setCoupons] = useState<Coupon[]>([]);

    useEffect(() => {
        setCoupons(couponStore.getState().byCategory);

        couponStore.subscribe(() => {
            setCoupons(couponStore.getState().byCategory); 
        });
    }, []);

    return (
        <div className="Coupons">
            <Filter />
            <div className="CouponsCards">
            {coupons?.map(c=><CouponCard withAction={true} coupon={c} key={c.id}/>)}
           </div>
        </div>
    );
}

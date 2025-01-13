import { useEffect, useState } from "react";
import { CompanyMenu } from "../CompanyMenu/CompanyMenu";
import "./CompanyDashboard.css";
import { CompanyMain } from "../CompanyMain/CompanyMain";
import { couponStore } from "../../../Redux/CouponStore";
import { ManageCoupons } from "../ManageCoupons/ManageCoupons";
import { Coupon } from "../../../models/Coupon";
import companyService from "../../../services/CompanyService";
import { authStore, logOut } from "../../../Redux/AuthStore";
import { useNavigate } from "react-router-dom";
import { AddCoupon } from "../AddCoupon/AddCoupon";
import { Company } from "../../../models/Company";
import { set } from "react-hook-form";
import { showErrorToast } from "../../ToastNotifications";

export function ComanyDashboard(): JSX.Element {
    const [content ,setContent] = useState<string>("main");
    const [coupons,setCoupons] = useState<Coupon[]>([]);
    const [company,setCompany] = useState<Company>();
    const [soldTotal,setSoldTotal] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(()=>{
        pullCoupons();
    },[])

    function pullCoupons(){
        const token = authStore.getState().token;
        if(token){
            companyService.getCompanyCoupons(token)
            .then(res=>setCoupons(res))
            .catch(err=> {showErrorToast(err.response.message); authStore.dispatch(logOut()); navigate("/login");})

            companyService.getCompanyDetails(token)
            .then(res=>setCompany(res))
            .catch(err=> showErrorToast(err.response.message))

            companyService.getTotalSold(token)
            .then(res=>setSoldTotal(res))
            .catch(err=> showErrorToast(err.response.data)) 
        }
       
    }

    function handleClick(content:string){
        setContent(content)
        return content
    }

    function handleBack(content:string){
        setContent(content)
    }

    return (
        <div className="ComanyDashboard">
			<CompanyMenu pullCoupons={pullCoupons} handleClick={handleClick} />
            <div id="Content">
                {content === "main" &&<CompanyMain coupons={coupons} soldTotal={soldTotal}/>}
                {content === "manage" &&<ManageCoupons/>}
                {content === "add" &&<AddCoupon handleBack={handleBack} company={company!}/>}
            </div>
        </div>
    );
}

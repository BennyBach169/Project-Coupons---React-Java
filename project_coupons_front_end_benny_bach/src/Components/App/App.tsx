
import { red } from "@mui/material/colors";
import { Header } from "../Header/Header";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "../Routing/Routing";
import { useEffect, useState } from "react";
import adminService from "../../services/AdminService";
import { couponStore } from "../../Redux/CouponStore";
import couponsService from "../../services/CouponsService";
import { BottomMenu } from "../BottomMenu/BottomMenu";
import { showErrorToast, ToastNotifications } from "../ToastNotifications";

export function App(): JSX.Element {

    useEffect(()=>{
        couponsService.getAllCoupons()
        .then()
        .catch(err=>showErrorToast(err.response.data))
    })

    


    return (
        <div className="App">
            <ToastNotifications />
            <BrowserRouter >
            <Header/>
            <Routing/>
            <BottomMenu/>
            </BrowserRouter>
        </div>
    );
}

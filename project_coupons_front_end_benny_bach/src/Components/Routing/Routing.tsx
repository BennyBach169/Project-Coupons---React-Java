import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import { App } from "../App/App";
import { AboutUs } from "../AboutUs/AboutUs";
import { Coupons } from "../CouponsPage/Coupons/Coupons";
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { ComanyDashboard } from "../ComanyManagment/ComanyDashboard/CompanyDashboard";

import { CustomerDashboard } from "../CustomerDashboard/CustomerDashboard";
import { CheckOut } from "../CouponsPage/CheckOut/CheckOut";
import { AdminDashBoard } from "../AdminManagment/AdminDashBoard/AdminDashBoard";


export function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/" Component={Home}/>
                <Route path="/aboutus" Component={AboutUs}/>
                <Route path="/coupons" Component={Coupons}/>
                <Route path="/login" Component={Login}/>
                <Route path="/companydashboard" Component ={ComanyDashboard}/>
                <Route path="/checkout" Component={CheckOut}/>
                <Route path="/customerdashboard" Component={CustomerDashboard}/>
                <Route path="/admindashboard" Component={AdminDashBoard}/>
            </Routes>
        </div>
    );
}

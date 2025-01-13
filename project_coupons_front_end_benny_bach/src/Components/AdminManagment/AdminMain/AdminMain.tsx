import { Company } from "../../../models/Company";
import { Customer } from "../../../models/Customer";
import { couponStore } from "../../../Redux/CouponStore";
import { AnimatedCircle } from "../../AnimatedCircle/AnimatedCircle";
import "./AdminMain.css";
interface DataProps{
    companies:Company[];
    customers:Customer[];
    totalSold:number;
}

export function AdminMain(props:DataProps): JSX.Element {
    return (
        <div className="AdminMain">
			<h2>Welcome Back</h2>
            <div className="StatsDisplay">
            <AnimatedCircle number={props.companies.length} text="Companies"/>
            <AnimatedCircle number={props.customers.length} text="Customers"/>
            <AnimatedCircle number={couponStore.getState().coupons.length} text="Coupons"/>
            <AnimatedCircle number={props.totalSold} text="Total Sold"/>
            </div>
        </div>
    );
}

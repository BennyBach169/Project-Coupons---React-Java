import { authStore } from "../../../Redux/AuthStore";
import "./CompanyMenu.css";

interface ContentProps{
    handleClick(content:string):string;
    pullCoupons():void
}

export function CompanyMenu(props: ContentProps): JSX.Element {

    return (
        <div className="CompanyMenu">
			<h2>Hello ,{authStore.getState().userName}</h2>
            <button onClick={()=>{props.handleClick("main"); props.pullCoupons()}}>Main</button>
            <button onClick={()=>{props.handleClick("manage"); props.pullCoupons()}}>Manage Coupons</button>
            <button onClick={()=>{props.handleClick("add"); props.pullCoupons()}}>Add Coupon</button>
        </div>
    );
}

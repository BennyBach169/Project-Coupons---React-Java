import { couldStartTrivia } from "typescript";
import { Coupon } from "../../../models/Coupon";
import { CouponAction } from "../CouponAction/CouponAction";
import "./CouponCard.css";
interface CouponProp {
  coupon: Coupon;
  withAction:boolean;
}
export function CouponCard(props: CouponProp): JSX.Element {
  return (
    <div className="CouponCard">
      <div className="CouponCardBox">
        <div className="discount">
          <span className="discount-text">20% Off</span>
        </div>
        <div className="content">
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>{props.coupon.title}</h2>
          <div style={{
              fontSize: "2.5rem",
            }}>{props.coupon.category}</div>
        </div>
        <div className="Dates">
          <span className="date-item">
            Start Date: {new Date(props.coupon.startDate).toLocaleDateString()}
          </span>
          <span className="date-item">
            End Date: {new Date(props.coupon.endDate).toLocaleDateString()}
          </span>
        </div>
      </div>
      {props.withAction && <CouponAction coupon={props.coupon}/>}
      
    </div>
  );
}

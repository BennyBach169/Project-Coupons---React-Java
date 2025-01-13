import { Coupon } from "../../../../models/Coupon";
import "./FeaturedCoupon.css";
interface DataProps {
  coupon: Coupon;
}
export function FeaturedCoupon(props: DataProps): JSX.Element {
  return (
    <div className="FeaturedCoupon">
     <div className="card">
    <div className="front">
      <p className="front-heading">Front card</p>
      <p>Follow Me For More</p>
    </div>
    <div className="back">
      <p className="back-heading">Back card</p>
      <p>Follow Me For More</p>
    </div>
  </div>
    </div>
  );
}

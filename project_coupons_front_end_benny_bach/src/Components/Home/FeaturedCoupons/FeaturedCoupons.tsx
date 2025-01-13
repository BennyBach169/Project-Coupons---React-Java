import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coupon } from "../../../models/Coupon";
import { couponStore } from "../../../Redux/CouponStore";
import { CouponCard } from "../../CouponsPage/CouponCard/CouponCard";
import "./FeaturedCoupons.css";

export function FeaturedCoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    setCoupons(couponStore.getState().coupons);
    const unsubscribe = couponStore.subscribe(() => {
      setCoupons(couponStore.getState().coupons);
    });

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % coupons.length);
    }, 3000);
    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, [coupons.length]);

  return (
    <div className="FeaturedCoupons">
      {coupons.length > 0 && (
        <div className="FC">
          <CouponCard withAction={false} coupon={coupons[currentIndex]} />
        </div>
      )}
      <div className="Header">
        <div>🔥 OUR BEST SELLERS 🔥</div>
        <span>Get an exclusive 20% discount on our top picks today!</span>
        <button onClick={() => navigate("/coupons")}>Shop Now</button>
      </div>
    </div>
  );
}

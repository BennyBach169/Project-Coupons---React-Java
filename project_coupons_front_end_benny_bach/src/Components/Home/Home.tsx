import { WelcomeSection } from "./WelcomeSection/WelcomeSection";
import "./Home.css";

import { Coupon } from "../../models/Coupon";
import { useEffect, useState } from "react";
import { couponStore } from "../../Redux/CouponStore";
import { CategoryCard } from "./CategoryCards/CategoryCard/CategoryCard";
import { CategoryCards } from "./CategoryCards/CategoryCards";
import { FeaturedCoupons } from "./FeaturedCoupons/FeaturedCoupons";
import { Partnership } from "./Partnership/Partnership";

export function Home(): JSX.Element {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  let couponsTemp: Coupon[] = [];

  useEffect(() => {
    setCoupons(couponStore.getState().coupons);
  }, []);
  return (
    <div className="Home">
      <WelcomeSection />
      <h2 className="Cate">Our Top Categories</h2>
      <CategoryCards />
      <FeaturedCoupons/>
      <h2 className="Part">It's All About Connections
        <div>
        Boost your business with our coupon platform! 
        </div>
        <div>
        Reach more customers, drive sales, and increase brand visibility 
        </div>
        <div>
        Join now and watch your offers turn into loyal customers!"
        </div>
      </h2>
      <Partnership/>
      <img src="/assets/partner.jpg" alt=""
      style={{
        width:"90%"
      }} />
      
    </div>
  );
}

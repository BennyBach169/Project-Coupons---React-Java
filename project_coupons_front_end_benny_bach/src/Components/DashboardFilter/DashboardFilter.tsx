import { useEffect, useState } from "react";
import "./DashboardFilter.css";
import { Category, getAllCategories } from "../../models/Category";
import { Coupon } from "../../models/Coupon";
import { authStore, logOut } from "../../Redux/AuthStore";
import companyService from "../../services/CompanyService";
import { useNavigate } from "react-router-dom";
import customerService from "../../services/CustomerService";
import { showErrorToast } from "../ToastNotifications";
interface CouponState {
  updateCouponState(coupon: Coupon[]): void;
  resetCoupons(): void;
  
  clientType: string;
  
}

export function DashboardFilter(props: CouponState): JSX.Element {
  const [category, setCategory] = useState<string>("All");
  const token = authStore.getState().token;
  const navigate = useNavigate();
  let categories: string[] = [];
  const [price, setPrice] = useState<number>(0);
  
  

  for (let c of getAllCategories()) {
    categories.push(Category[c].toString());
  }
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    
    if (event.target.value === "All") {
      props.resetCoupons();
      setCategory("All");
    } else {
      setCategory(event.target.value);
      let categoryE: Category =
        Category[event.target.value as keyof typeof Category];
      getCouponsByCategory(categoryE);
    }
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory("All")
    const newPrice = Number(event.target.value);
    setPrice(newPrice);
    getCouponsByMaxPrice(newPrice);
  };

  function getCouponsByCategory(category: Category) {
    if (token) {
      if (props.clientType === "company") {
        companyService
          .CouponsByCategory(token, category)
          .then((res) => props.updateCouponState(res))
          .catch((err) => {
            showErrorToast(err.response.message);
            authStore.dispatch(logOut());
            navigate("/login");
          });
      }

      if (props.clientType === "customer") {
        customerService
          .getCustomerCouponsByCategory(token, category)
          .then((res) => props.updateCouponState(res))
          .catch((err) => {
            showErrorToast(err.response.message);
            authStore.dispatch(logOut());
            navigate("/login");
          });
      }
    }
  }

  function getCouponsByMaxPrice(inputPrice: number) {
    if (token) {
      if (props.clientType === "company") {
        companyService
          .CouponsByMaxPrice(token, inputPrice)
          .then((res) => props.updateCouponState(res))
          .catch((err) => {
            showErrorToast(err.response.message);
            authStore.dispatch(logOut());
            navigate("/login");
          });
      }

      if (props.clientType === "customer") {
        customerService
          .getCustomerCouponsByMaxPrice(token, inputPrice)
          .then((res) => props.updateCouponState(res))
          .catch((err) => {
            showErrorToast(err.response.message);
            authStore.dispatch(logOut());
            navigate("/login");
          });
      }
    }
  }

  return (
    <div className="DashboardFilter">
      <div>
        {" "}
        Category:{" "}
        <select
          className="select"
          onChange={handleCategoryChange}
          value={category}
          style={{
            width: "262px",
          }}
        >
          <option value={"All"}>All</option>
          {Array.from(categories).map((c) => (
            <option key={c} value={c}>
              {c.toLocaleLowerCase()}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Price {price}$</label>
        <input type="number" value={price} onChange={handlePriceChange}   />
      </div>
    </div>
  );
}

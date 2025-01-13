import { FormControl, InputLabel, MenuItem, Select, Slider } from "@mui/material";
import { Coupon } from "../../../models/Coupon";
import "./Filter.css";
import { useEffect, useState } from "react";
import { Category } from "../../../models/Category";
import { couponStore, getByCategory, getByPrice } from "../../../Redux/CouponStore";



export function Filter(): JSX.Element {
  const [category , setCategory] = useState<string>("");
  let coupons: Coupon[];
  coupons = couponStore.getState().coupons;
  let maxPrice : number = 0;
  

  const allCategories = new Set<string>;
  for(let c of coupons){
    allCategories.add(c.category.toString())
    if(c.price>maxPrice){
        maxPrice=parseInt(c.price.toFixed(2));
    }
  }
  
  const [price, setPrice] = useState<number>(maxPrice);
 

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    couponStore.dispatch(getByCategory(event.target.value))
    setCategory(event.target.value);
  };





  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(event.target.value);
    couponStore.dispatch(getByCategory(category)) 
    couponStore.dispatch(getByPrice(newPrice));
    setPrice(newPrice); 
  };

  



  return (
    <div className="Filter">
      <h3>Filters</h3>
      <div className="Categories">
        <label htmlFor="">Categories</label>
        <select onChange={handleCategoryChange} value={category} className="SelectBox">
            <option value="">All</option> 
            {Array.from(allCategories).map(c=><option key={c} value={c}>{c.toLocaleLowerCase()}</option>)}
        </select>
      </div>
      <div className="Slider">
      <label>Price {price}$</label>
        <input
          type="range"
          min={0}
          max={maxPrice+1} 
          step={1} 
          value={price}
          onChange={handlePriceChange}
          
          
        />
        </div>
    </div>
  );
}



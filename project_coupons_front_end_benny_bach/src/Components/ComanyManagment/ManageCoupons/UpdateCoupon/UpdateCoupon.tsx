import { useState } from "react";
import { Category, getAllCategories } from "../../../../models/Category";
import { Coupon } from "../../../../models/Coupon";
import "./UpdateCoupon.css";
import companyService from "../../../../services/CompanyService";
import { authStore } from "../../../../Redux/AuthStore";
import { dividerClasses } from "@mui/material";
import { showErrorToast, showSuccessToast } from "../../../ToastNotifications";

interface CouponProps {
  coupon: Coupon;
  handleUpdateSub():void;
}

export function UpdateCoupon(props: CouponProps): JSX.Element {
  const [category, setCategory] = useState<string>(
    props.coupon.category.toString()
  );
  const [title, setTitle] = useState<string>(props.coupon.title);
  const [amount, setAmount] = useState<number>(props.coupon.amount);
  const [price, setPrice] = useState<number>(parseInt(props.coupon.price.toFixed(2)));
  const [description, setDescription] = useState<string>(
    props.coupon.description
  );
  const [startDate, setStartDate] = useState<string>(
    props.coupon.startDate ? props.coupon.startDate.toString().split("T")[0] : ""
  );
  const [endDate, setEndDate] = useState<string>(
    props.coupon.endDate ? props.coupon.endDate.toString().split("T")[0] : ""
  );
  const [updateClicked,setUpdateClicked] = useState<boolean>(false);


  let categories: string[] = [];
  for (let c of getAllCategories()) {
    categories.push(Category[c].toString());
  }
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  function handleSubmit(event: React.FormEvent){
    event.preventDefault();
    let categoryE: Category = Category[category as keyof typeof Category];
    let coupon : Coupon = new Coupon(props.coupon.id,props.coupon.company,categoryE,title,description,
        new Date(startDate),new Date(endDate),amount,price);

        const token = authStore.getState().token;
        companyService.updateCoupon(token,coupon)
        .then(res=>{
          showSuccessToast("Coupon updated successfully!")
          setUpdateClicked(true)
          props.handleUpdateSub();})
        .catch(err=>showErrorToast(err.response.data))
  }

  return (
    <div className="UpdateCoupon">
      {updateClicked? <div>Coupon updated!</div>:
      <form className="form" onSubmit={handleSubmit}>
        <button id="back" onClick={props.handleUpdateSub}>Go Back</button>
      <div id="header">Update Coupon</div>
        <div id="row1">
          <span>
            ID:{" "}
            <input
              className="input"
              type="text"
              disabled
              value={props.coupon.id}
            />
          </span>
          <span>
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
              <option value={category}>{category}</option>
              {Array.from(categories).map((c) => (
                <option key={c} value={c}>
                  {c.toLocaleLowerCase()}
                </option>
              ))}
            </select>
          </span>
          <span>
            Title:{" "}
            <input
              className="input"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              
            />
          </span>
        </div>

        <div id="row2">
          <span>
            Amount:{" "}
            <input
              className="input"
              type="number"
              onChange={(e) => setAmount(parseInt(e.target.value))}
              value={amount}
            />
          </span>
          <span>
            Price:{" "}
            <input
              className="input"
              type="number"
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              value={price}
            />
          </span>
          <div className="dates">
            <span>
              Start Date: <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
            </span>
            <span>
              End Date: <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} />
            </span>
          </div>
        </div>
        <span className="descriptiocContain">Description: <textarea className="description" onChange={(e)=> setDescription(e.target.value)} value={description} /></span>
        <button id="action2" type="submit" >Update</button>
      </form>
}
    </div>
  );
}

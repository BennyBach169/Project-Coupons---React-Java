import { useState } from "react";
import "./AddCoupon.css";
import { Category, getAllCategories } from "../../../models/Category";
import { Coupon } from "../../../models/Coupon";
import { authStore } from "../../../Redux/AuthStore";
import companyService from "../../../services/CompanyService";
import { Company } from "../../../models/Company";
import { showErrorToast, showSuccessToast } from "../../ToastNotifications";

interface CompanyProps{
    company:Company
    handleBack(content: string): void;
}

export function AddCoupon(props:CompanyProps): JSX.Element {
    const [category, setCategory] = useState<string>();
      const [title, setTitle] = useState<string>("");
      const [amount, setAmount] = useState<number>(1);
      const [price, setPrice] = useState<number>(1);
      const [description, setDescription] = useState<string>("");
      const [startDate, setStartDate] = useState<string>("");
      const [endDate, setEndDate] = useState<string>("");
      const [addClicked,setAddClicked] = useState<boolean>(false);
    
    
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
        let coupon : Coupon = new Coupon(0,props.company,categoryE,title,description,
            new Date(startDate!),new Date(endDate!),amount,price);
    
            const token = authStore.getState().token;
            companyService.addCoupon(token,coupon)
            .then(res=>{
              showSuccessToast("Coupon added successfully!")
              setAddClicked(true)
              props.handleBack("manage")
            })
            .catch(err=>showErrorToast(err.response.data))
      }
    
      return (
        <div className="AddCoupon">
          {addClicked? <div>Coupon added succsesfuly!</div>:
          <form className="form" onSubmit={handleSubmit}>
            <button id="back" onClick={()=>props.handleBack("main")}>Go Back</button>
          <div id="header">Add New Coupon</div>
            <div id="row1">
              <span>
                ID:{" "}
                <input
                  className="input"
                  type="text"
                  disabled
                  value={"Auto Generated"}
                />
              </span>
              <span>
                {" "}
                Category:{" "}
                <select
                  className="select"
                  onChange={handleCategoryChange}
                  value={category}
                  required
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
                  required
                />
              </span>
            </div>
    
            <div id="row2">
              <span>
                Amount:{" "}
                <input
                  className="input"
                  type="number"
                  onChange={(e) => setAmount(Number(e.target.value))}
                  value={amount}
                  required
                />
              </span>
              <span>
                Price:{" "}
                <input
                  className="input"
                  type="number"
                  onChange={(e) => setPrice(Number(e.target.value))}
                  value={price}
                  required
                />
              </span>
              <div className="dates">
                <span>
                  Start Date: <input type="date" required value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
                </span>
                <span>
                  End Date: <input type="date" required value={endDate} onChange={(e)=>setEndDate(e.target.value)} />
                </span>
              </div>
            </div>
            <span className="descriptiocContain" >Description: <textarea className="description" required onChange={(e)=> setDescription(e.target.value)} value={description} /></span>
            <button id="action2" type="submit" >Add</button>
          </form>
    }
        </div>
    );
}

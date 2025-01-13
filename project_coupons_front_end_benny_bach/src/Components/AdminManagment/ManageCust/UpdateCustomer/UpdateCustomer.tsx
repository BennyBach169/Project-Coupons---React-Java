import { useState } from "react";
import { Customer } from "../../../../models/Customer";
import "./UpdateCustomer.css";
import { authStore } from "../../../../Redux/AuthStore";
import adminService from "../../../../services/AdminService";
import { showErrorToast, showSuccessToast } from "../../../ToastNotifications";
interface DataProps {
    customer: Customer;
    handleUpdateSub(): void;
  }
export function UpdateCustomer(props:DataProps): JSX.Element {
  const [firstName, setFirstName] = useState<string>(props.customer.firstName);
  const [lastName, setLastName] = useState<string>(props.customer.lastName);
  const [email, setEmail] = useState<string>(props.customer.email);
  const [password, setPassword] = useState<string>("");
  const [updateClicked, setUpdateClicked] = useState<boolean>(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if(email===""&&password===""&&lastName==""&&firstName==""){
        alert("Not updated, You must input at least One of the options , Email | Passwrod | Last Name | First Name.")
    }else{
        let customer: Customer = new Customer(props.customer.id, firstName, lastName, email, password);
          const token = authStore.getState().token;
          adminService
            .updateCustomer(token, customer)
            .then((res) => {
              showSuccessToast("Customer Updated successfully!")
              setUpdateClicked(true);
              props.handleUpdateSub();
            })
            .catch((err) => showErrorToast(err.response.data));
    }
    
  }
    return (
        <div className="UpdateCustomer">
			 {updateClicked ? (
        <div>Customer Updated</div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <button id="back" onClick={props.handleUpdateSub}>
            Go Back
          </button>
          <div id="header">Update Customer</div>
          <div id="row1">
            <span>
              First Name:{" "}
              <input
                className="input"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </span>
            <span>
              Last Name:{" "}
              <input
                className="input"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </span>
          </div>

          <div id="row2">
            <span>
              Email:{" "}
              <input
                className="input"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="email"
              />
            </span>
            <span>
              Password:{" "}
              <input
                className="input"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="current-password"
              />
            </span>
          </div>
          <button id="action2" type="submit">
            Update
          </button>
        </form>
      )}
        </div>
    );
}

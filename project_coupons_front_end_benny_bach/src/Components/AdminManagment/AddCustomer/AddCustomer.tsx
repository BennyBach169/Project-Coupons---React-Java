import { useState } from "react";
import "./AddCustomer.css";
import { Customer } from "../../../models/Customer";
import { authStore } from "../../../Redux/AuthStore";
import adminService from "../../../services/AdminService";
import { showErrorToast, showSuccessToast } from "../../ToastNotifications";

interface DataProps {
    handleBack(content: string): void;
  }

export function AddCustomer(props: DataProps): JSX.Element {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [addClicked, setAddClicked] = useState<boolean>(false);
  
    function handleSubmit(event: React.FormEvent) {
      event.preventDefault();
      let customer: Customer = new Customer(0, firstName, lastName, email, password);
      const token = authStore.getState().token;
      adminService
        .addCustomer(token, customer)
        .then((res) => {
          showSuccessToast("Customer added successfully!")
          setAddClicked(true);
          props.handleBack("manageCust");
        })
        .catch((err) => showErrorToast(err.response.data));
    }
    return (
        <div className="AddCustomer">
			  {addClicked ? (
        <div>Cusromer added succsesfuly!</div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <button id="back" onClick={() => props.handleBack("main")}>
            Go Back
          </button>
          <div id="header">Add New Cusromer</div>
          <div id="row1">
            <span>
              First Name:{" "}
              <input
                className="input"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
                autoComplete="first name"
              />
            </span>
            <span>
              Last Name:{" "}
              <input
                className="input"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
                autoComplete="last name"
              />
            </span>
          </div>

          <div id="row2">
            <span>
              Email:{" "}
              <input
                className="input"
                type="rext"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
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
                required
                autoComplete="current-password"
              />
            </span>
          </div>
          <button id="action2" type="submit">
            Add
          </button>
        </form>
      )}
        </div>
    );
}

import { useState } from "react";
import "./UpdateCompany.css";
import { Company } from "../../../../models/Company";
import { authStore } from "../../../../Redux/AuthStore";
import adminService from "../../../../services/AdminService";
import { showErrorToast, showSuccessToast } from "../../../ToastNotifications";
interface DataProps {
  company: Company;
  handleUpdateSub(): void;
}

export function UpdateCompany(props: DataProps): JSX.Element {
  const [email, setEmail] = useState<string>(props.company.email!);
  const [passwrod, setPasswrod] = useState<string>("");

  const [updateClicked, setUpdateClicked] = useState<boolean>(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if(email===""&&passwrod===""){
        alert("Not updated, You must input at least One of the options , Email | Passwrod Or Both.")
    }else{
        let company: Company = new Company(
            props.company.id,
            props.company.name,
            email,
            passwrod
          );
          const token = authStore.getState().token;
          adminService
            .updateCompany(token, company)
            .then((res) => {
              showSuccessToast("Company updated successfully!")
              setUpdateClicked(true);
              props.handleUpdateSub();
            })
            .catch((err) => showErrorToast(err.response.data));
    }
    
  }
  return (
    <div className="UpdateCompany">
      {updateClicked ? (
        <div>Company Updated</div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <button id="back" onClick={props.handleUpdateSub}>
            Go Back
          </button>
          <div id="header">Update Company</div>
          <div id="row1">
            <span>
              ID:{" "}
              <input
                className="input"
                type="text"
                disabled
                value={props.company.id}
              />
            </span>
            <span>
              Name:{" "}
              <input
                className="input"
                type="text"
                disabled
                value={props.company.name}
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
                onChange={(e) => setPasswrod(e.target.value)}
                value={passwrod}
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

import { useState } from "react";
import "./AddCompany.css";
import { Company } from "../../../models/Company";
import { authStore } from "../../../Redux/AuthStore";
import adminService from "../../../services/AdminService";
import { showErrorToast, showSuccessToast } from "../../ToastNotifications";

interface DataProps {
  handleBack(content: string): void;
}

export function AddCompany(props: DataProps): JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [addClicked, setAddClicked] = useState<boolean>(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let company: Company = new Company(0, name, email, password);
    const token = authStore.getState().token;
    adminService
      .addCompany(token, company)
      .then((res) => {
        showSuccessToast("Company added successfully!")
        setAddClicked(true);
        props.handleBack("manageComp");
      })
      .catch((err) => showErrorToast(err.response.data));
  }
  return (
    <div className="AddCompany">
      {addClicked ? (
        <div>Company added succsesfuly!</div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <button id="back" onClick={() => props.handleBack("main")}>
            Go Back
          </button>
          <div id="header">Add New Company</div>
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
              Name:{" "}
              <input
                className="input"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                autoComplete="name"
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

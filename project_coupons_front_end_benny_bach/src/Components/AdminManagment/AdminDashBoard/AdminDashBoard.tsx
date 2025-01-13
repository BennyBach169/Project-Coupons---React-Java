import { useEffect, useState } from "react";
import "./AdminDashBoard.css";
import { Company } from "../../../models/Company";
import { Coupon } from "../../../models/Coupon";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../../models/Customer";
import { authStore, logOut } from "../../../Redux/AuthStore";
import adminService from "../../../services/AdminService";
import { AdminMenu } from "../AdminMenu/AdminMenu";
import { ManageComp } from "../ManageComp/ManageComp";
import { AdminMain } from "../AdminMain/AdminMain";
import { ManageCust } from "../ManageCust/ManageCust";
import { AddCompany } from "../AddCompany/AddCompany";
import { AddCustomer } from "../AddCustomer/AddCustomer";
import { showErrorToast } from "../../ToastNotifications";

export function AdminDashBoard(): JSX.Element {
  const [content, setContent] = useState<string>("main");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalSold, setTotalSold] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    pullData();
  }, []);

  function pullData() {
    const token = authStore.getState().token;
    if (token) {
      adminService
        .getAllCompanies(token)
        .then((res) => setCompanies(res))
        .catch((err) => {
          showErrorToast(err.response.data);
          authStore.dispatch(logOut());
          navigate("/login");
        });
      adminService
        .getAllCustomers(token)
        .then((res) => setCustomers(res))
        .catch((err) => showErrorToast(err.response.data));

        adminService.totalSold(token)
        .then(res=>setTotalSold(res))
        .catch(err=>showErrorToast(err.response.data))
    }
  }

  function handleClick(content: string) {
    setContent(content);
    return content;
  }

  function handleBack(content: string) {
    setContent(content);
  }
  return (
    <div className="AdminDashBoard">
      <AdminMenu pullDate={pullData} handleClick={handleClick} />
      <div id="Content">
        {content === "main" && (
          <AdminMain companies={companies} customers={customers} totalSold={totalSold} />
        )}
        {content === "manageComp" && <ManageComp />}
        {content === "manageCust" && <ManageCust />}
        {content === "addComp" && <AddCompany handleBack={handleBack} />}
        {content === "addCust" && <AddCustomer handleBack={handleBack} />}
      </div>
    </div>
  );
}

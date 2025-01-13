import { useEffect, useState } from "react";
import "./ManageComp.css";
import { Company } from "../../../models/Company";
import { useNavigate } from "react-router-dom";
import { authStore, logOut } from "../../../Redux/AuthStore";
import adminService from "../../../services/AdminService";
import { CompaniesTable } from "./CompaniesTable/CompaniesTable";
import { UpdateCompany } from "./UpdateCompany/UpdateCompany";
import { AdminFilters } from "../AdminFilters/AdminFilters";
import { showErrorToast, showSuccessToast } from "../../ToastNotifications";

export function ManageComp(): JSX.Element {
  const [updateClicked, setUpdateClicked] = useState<boolean>(false);
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
  const [companyToUpdate, setCompanyToUpdate] = useState<Company>();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyToDelete, setCompanyToDelete] = useState<number>(0);
  const navigate = useNavigate();
  const token = authStore.getState().token;

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    if (token) {
      adminService
        .getAllCompanies(token)
        .then((res) => setCompanies(res))
        .catch((err) => {
          showErrorToast(err.response.data);
          authStore.dispatch(logOut());
          navigate("/login");
        });
    }
  }

  function handleUpdate(company: Company) {
    setCompanyToUpdate(company);
    setDeleteClicked(false);
    setUpdateClicked(true);
  }
  function handleDelete(id: number) {
    setUpdateClicked(false);
    setDeleteClicked(true);
    setCompanyToDelete(id);
  }

  function finalyDeleteCompany() {
    if (companyToDelete != 0) {
      adminService
        .deleteCompany(token, companyToDelete)
        .then((res) => {
          showSuccessToast("Company Deleted successfully!")
          setDeleteClicked(false);
          setCompanyToDelete(0);
          getData();
        })
        .catch((err) => showErrorToast(err.response.data));
    }
  }

  function handleUpdateSub() {
    setUpdateClicked(false);
    getData();
  }

  function updateCoState(compnay:Company[]){
    if(compnay.length>0){
    setCompanies(compnay);
    }else{
      getData();
    }
  }

  return (
    <div className="ManageComp">
      {!updateClicked && !deleteClicked && (
        <div>
          <AdminFilters filterForCompany={true} updateCoState={updateCoState} />
          <CompaniesTable
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            companies={companies}
          />
        </div>
      )}
      {updateClicked && (
        <UpdateCompany
          handleUpdateSub={handleUpdateSub}
          company={companyToUpdate!}
        />
      )}
      {deleteClicked && (
        <div>
          <h2>Are you sure you want to delete this coupon?</h2>
          <button onClick={finalyDeleteCompany}>Yes</button>
          <button
            onClick={() => {
              setDeleteClicked(false);
              getData();
            }}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}

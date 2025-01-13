import { useEffect, useState } from "react";
import "./ManageCust.css";
import { Customer } from "../../../models/Customer";
import { useNavigate } from "react-router-dom";
import { authStore, logOut } from "../../../Redux/AuthStore";
import adminService from "../../../services/AdminService";
import { CustomersTable } from "./CustomersTable/CustomersTable";
import { UpdateCustomer } from "./UpdateCustomer/UpdateCustomer";
import { AdminFilters } from "../AdminFilters/AdminFilters";
import { showErrorToast, showSuccessToast } from "../../ToastNotifications";

export function ManageCust(): JSX.Element {
    const [updateClicked, setUpdateClicked] = useState<boolean>(false);
    const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
    const [customerToUpdate, setCustomerToUpdate] = useState<Customer>();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customerToDelete, setCustomerToDelete] = useState<number>(0);
    const navigate = useNavigate();
    const token = authStore.getState().token;
  
    useEffect(() => {
      getData();
    }, []);
  
    function getData() {
      if (token) {
        adminService
          .getAllCustomers(token)
          .then((res) => setCustomers(res))
          .catch((err) => {
            showErrorToast(err.response.data);
            authStore.dispatch(logOut());
            navigate("/login");
          });
      }
    }
  
    function handleUpdate(customer: Customer) {
      setCustomerToUpdate(customer);
      setDeleteClicked(false);
      setUpdateClicked(true);
    }
    function handleDelete(id: number) {
      setUpdateClicked(false);
      setDeleteClicked(true);
      setCustomerToDelete(id);
    }
  
    function finalyDeleteCustomer() {
      if (customerToDelete != 0) {
        adminService
          .deleteCustomer(token, customerToDelete)
          .then((res) => {
            showSuccessToast("Customer Deleted successfully!")
            setDeleteClicked(false);
            setCustomerToDelete(0);
            getData();
          })
          .catch((err) => showErrorToast(err.response.data));
      }
    }
  
    function handleUpdateSub() {
      setUpdateClicked(false);
      getData();
    }

    function handleCuState(customer:Customer[]){
      if(customer.length>0){
        setCustomers(customer);
        }else{
          getData();
        }
    }
    return (
        <div className="ManageCust">
			{!updateClicked && !deleteClicked && (
        <div>
          <AdminFilters filterForCompany={false} updateCuState={handleCuState} />
          <CustomersTable
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            customers={customers}
          />
        </div>
      )}
      {updateClicked && (
        <UpdateCustomer
          handleUpdateSub={handleUpdateSub}
          customer={customerToUpdate!}
        />
      )}
      {deleteClicked && (
        <div>
          <h2>Are you sure you want to delete this coupon?</h2>
          <button onClick={finalyDeleteCustomer}>Yes</button>
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

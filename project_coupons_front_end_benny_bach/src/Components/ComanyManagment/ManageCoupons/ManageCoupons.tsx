import { useEffect, useState } from "react";
import { Coupon } from "../../../models/Coupon";
import "./ManageCoupons.css";
import { TableContainer } from "./TableContainer/TableContainer";
import { UpdateCoupon } from "./UpdateCoupon/UpdateCoupon";
import { authStore, logOut } from "../../../Redux/AuthStore";
import companyService from "../../../services/CompanyService";
import { useNavigate } from "react-router-dom";
import { DashboardFilter } from "../../DashboardFilter/DashboardFilter";
import { showErrorToast, showSuccessToast } from "../../ToastNotifications";




export function ManageCoupons(): JSX.Element {
  const [updateClicked, setUpdateClicked] = useState<boolean>(false);
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
  const [couponToUpdate, setCouponToUpdate] = useState<Coupon>();
  const [coupons,setCoupons] = useState<Coupon[]>([]);
  const [couponToDelete,setCouponToDelete] = useState<number>(0);
  const navigate = useNavigate();
  const token = authStore.getState().token;

  useEffect(()=>{
   getCoupons();
},[])

function getCoupons(){
    if(token){
        companyService.getCompanyCoupons(token)
        .then(res=>{setCoupons(res);
        })
        .catch(err=> {showErrorToast(err.response.data); authStore.dispatch(logOut()); navigate("/login");}) 
    }
}




  function handleUpdate(coupon: Coupon) {
    setCouponToUpdate(coupon);
    setDeleteClicked(false);
    setUpdateClicked(true);
  }
  function handleDelete(id: number) {
    setUpdateClicked(false);
    setDeleteClicked(true);
    setCouponToDelete(id);
  }

  function finalyDeleteCoupon(){
    if(couponToDelete!=0){
      companyService.deleteCoupon(token,couponToDelete)
    .then(res=>{
        showSuccessToast("Coupon deleted successfully!")
        setDeleteClicked(false);
        setCouponToDelete(0);
        getCoupons();
    })
    .catch(err=>showErrorToast(err.response.data))
    }
  }

  function handleUpdateSub(){
    setUpdateClicked(false);
    getCoupons();
  }

  function updateCouponState(coupons: Coupon[]){
    setCoupons(coupons);
  }

  return (
    <div className="ManageCoupons">
      {!updateClicked && !deleteClicked && (
        <div>
        <DashboardFilter  updateCouponState={updateCouponState} resetCoupons={getCoupons}  clientType="company"/>
        <TableContainer
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          coupons={coupons}
        />
        </div>
      )}
      {updateClicked && <UpdateCoupon handleUpdateSub={handleUpdateSub}  coupon={couponToUpdate!}/>}
      {deleteClicked && 
      <div>
      <h2>Are you sure you want to delete this coupon?</h2>
      <button onClick={finalyDeleteCoupon}>Yes</button>
      <button onClick={()=>{setDeleteClicked(false); getCoupons();}}>No</button>
      </div>
       }
    </div>
  );
}

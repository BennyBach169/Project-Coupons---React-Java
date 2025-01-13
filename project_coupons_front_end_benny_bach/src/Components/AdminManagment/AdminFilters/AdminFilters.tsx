import { useEffect, useState } from "react";
import "./AdminFilters.css";
import { authStore } from "../../../Redux/AuthStore";
import { useNavigate } from "react-router-dom";
import { Coupon } from "../../../models/Coupon";
import adminService from "../../../services/AdminService";
import { Customer } from "../../../models/Customer";
import { Company } from "../../../models/Company";
import { showErrorToast } from "../../ToastNotifications";

interface StateProps{
    filterForCompany:boolean;
    updateCoState?(company:Company[]):void
    updateCuState?(customer:Customer[]):void
}

export function AdminFilters(props:StateProps): JSX.Element {
    const [companyFilter,setCompanyFilter]= useState<boolean>(props.filterForCompany);
    const [id,setId] = useState<number>(0);
    const token = authStore.getState().token;

    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       setId(Number(event.target.value))
      };

      function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if(companyFilter){
            if(token){
                adminService.getOneCompany(token,Number(id))
                .then(res=>{
                    let company:Company[]=[] ;
                    company.push(res);
                    if (props.updateCoState) { 
                        props.updateCoState(company);
                    }
                })
                .catch(err=>{
                    showErrorToast(err.response.data)
                    if (props.updateCoState) { 
                        props.updateCoState([]);
                    }
                }   
                )
            }

            
        }else{
            if(token){
                adminService.getOneCustomer(token,Number(id))
                .then(res=>{
                    let customer:Customer[] =[];
                    customer.push(res);
                    if (props.updateCuState) { 
                        props.updateCuState(customer);
                    }
                })
                .catch(err=>{
                    showErrorToast(err.response.data)
                    if (props.updateCuState) { 
                        props.updateCuState([]);
                    }
                }
                )
            }
        }
      }
    


    return (
        <div className="AdminFilters">
            {companyFilter&&(
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>Get Compnay By Id: </label>
                    <input type="number" onChange={handleIdChange} />
                    <button type="submit">Search</button>
                    </form>
                </div>
            )}
            {!companyFilter&&(
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>Get Customer By Id: </label>
                    <input type="number" onChange={handleIdChange} />
                    <button type="submit"   >Search</button>
                    </form>
                </div>
            )}
			
        </div>
    );
}

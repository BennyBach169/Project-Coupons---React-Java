import { Customer } from "../../../../models/Customer";
import "./CustomersTable.css";
interface DataProps{
    customers:Customer[];
    handleDelete(id:number) : void;
    handleUpdate(customer:Customer) : void;
}

export function CustomersTable(props:DataProps): JSX.Element {
    return (
        <div className="CustomersTable">
			<div className="TableContainer">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Update<br/> Customer</th>
            <th>
              Delete
              <br /> Customer
            </th>
          </tr>
        </thead>
        <tbody>
          {props.customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.firstName}</td>
              <td>{c.lastName}</td>
              <td>{c.email}</td>
              <td>
                <button id="action" onClick={()=>props.handleUpdate(c)}>Update</button>
              </td>
              <td>
                <button id="action" onClick={()=>props.handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
    );
}

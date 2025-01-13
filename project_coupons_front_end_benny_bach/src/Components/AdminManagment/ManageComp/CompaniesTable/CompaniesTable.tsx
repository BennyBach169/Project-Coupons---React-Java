import { Company } from "../../../../models/Company";
import "./CompaniesTable.css";
interface DataProps{
    companies:Company[];
    handleDelete(id:number) : void;
    handleUpdate(company:Company) : void;
}
export function CompaniesTable(props:DataProps): JSX.Element {
    return (
        <div className="CompaniesTable">
			<div className="TableContainer">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Update<br/> Company</th>
            <th>
              Delete
              <br /> Company
            </th>
          </tr>
        </thead>
        <tbody>
          {props.companies.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email!}</td>
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

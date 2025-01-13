import { Coupon } from "../../../../models/Coupon";
import "./TableContainer.css";
interface CouponsProps {
  coupons: Coupon[];
  handleDelete(id:number) : void;
  handleUpdate(coupon:Coupon) : void;
}
export function TableContainer(props: CouponsProps): JSX.Element {
  return (
    <div className="TableContainer">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Title</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Update Coupon</th>
            <th>
              Delete
              <br /> Coupon
            </th>
          </tr>
        </thead>
        <tbody>
          {props.coupons.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.category.toString()}</td>
              <td>{c.title}</td>
              <td>{c.description}</td>
              <td>{c.startDate.toString()}</td>
              <td>{c.endDate.toString()}</td>
              <td>{c.amount}</td>
              <td>{c.price.toFixed(2)}</td>
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
  );
}

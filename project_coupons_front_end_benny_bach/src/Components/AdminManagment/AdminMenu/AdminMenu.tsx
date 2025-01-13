import "./AdminMenu.css";
interface ContentProps{
    handleClick(content:string):string;
    pullDate():void
}
export function AdminMenu(props:ContentProps): JSX.Element {
    return (
        <div className="AdminMenu">
			<button onClick={()=>{props.handleClick("main"); props.pullDate()}}>Main</button>
            <button onClick={()=>{props.handleClick("manageComp"); props.pullDate()}}>Manage Companies</button>
            <button onClick={()=>{props.handleClick("manageCust"); props.pullDate()}}>Manage Customers</button>
            <button onClick={()=>{props.handleClick("addComp"); props.pullDate()}}>Add Company</button>
            <button onClick={()=>{props.handleClick("addCust"); props.pullDate()}}>Add Customer</button>
        </div>
    );
}

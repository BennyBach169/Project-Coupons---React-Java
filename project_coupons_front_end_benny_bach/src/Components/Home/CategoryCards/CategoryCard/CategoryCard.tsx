import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";
import { couponStore, getByCategory } from "../../../../Redux/CouponStore";

interface CatProps{
    categoty:string;
}

export function CategoryCard(props:CatProps): JSX.Element {

    const navigate = useNavigate();

    function handleClick(){
        couponStore.dispatch(getByCategory(props.categoty.toUpperCase()))
        navigate("/coupons")
    }
    
  return (
    <div className="CategoryCard">
         <figure onClick= {handleClick} className="CatCard">
        <figcaption className="card_title">{props.categoty}</figcaption>
    </figure>
    </div>
  );
}

import styled from "styled-components";
import "./WelcomeSection.css";
import { useNavigate } from "react-router-dom";


export function WelcomeSection(): JSX.Element {
    const navigate = useNavigate();

    return (
        <div className="WelcomeSection">
			 <h1>Find the Best Deals on Your Favorite Products</h1>
            <p>Save money with exclusive coupons across categories.</p>
            <button className="cta-button" onClick={()=>navigate("/coupons")}>Browse Coupons</button>
        </div>
    );
}

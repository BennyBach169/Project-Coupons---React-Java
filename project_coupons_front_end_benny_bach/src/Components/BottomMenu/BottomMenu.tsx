import { NavLink, useNavigate } from "react-router-dom";
import "./BottomMenu.css";
import { Social } from "../Menu/Social/Social";

export function BottomMenu(): JSX.Element {
  const navigate = useNavigate();

  function handleLogoClick() {
    navigate("/");
  }
  return (
    <div className="BottomMenu">
      <div className="logo-b">
        <img
          onClick={handleLogoClick}
          src="/assets/Golden Black Minimalist Elegant Apartment Logo (2).png"
          alt=""
        />
      </div>
      <div className="m-buttons">
      <NavLink to={"/"} className={"menu-bottom"}>
        Home
      </NavLink>
      <NavLink to={"/coupons"} className={"menu-bottom"}>
        Coupons
      </NavLink>
      <NavLink to={"/aboutus"} className={"menu-bottom"}>
        About Us
      </NavLink>
      </div>
      <Social />
    </div>
  );
}

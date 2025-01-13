import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "../Menu/Menu";
import "./Header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import { authStore, logOut } from "../../Redux/AuthStore";
import { set } from "react-hook-form";
import { cartStore } from "../../Redux/CartStore";
import loginService from "../../services/LoginService";
import { showErrorToast, showSuccessToast } from "../ToastNotifications";

export function Header(): JSX.Element {
  const [userName, setUserName] = useState<string>("");
  const [cartItems, setCartItems] = useState<number>(0);
  const [clientType, setClientType] = useState<string>("");

  useEffect(() => {
    setClientType(authStore.getState().clientType);
    authStore.subscribe(() => {
      setClientType(authStore.getState().clientType);
    });
  });

  const navigate = useNavigate();
  const handleLogoClick = () => {
    
    navigate("/");
  };

  useEffect(() => {
    setUserName(authStore.getState().userName);
    authStore.subscribe(() => {
      setUserName(authStore.getState().userName);
    });

    setCartItems(cartStore.getState().coupons.length);
    cartStore.subscribe(() => {
      setCartItems(cartStore.getState().coupons.length);
    });

    setClientType(authStore.getState().clientType);
    authStore.subscribe(() => {
      setClientType(authStore.getState().clientType);
    });
  }, []);

  function handleLogout() {
    let token = authStore.getState().token;
    loginService.lotout(token)
    .then(res=>{
      showSuccessToast("Logged Out")
      authStore.dispatch(logOut());
    })
    .catch(err=>showErrorToast(err.response.data))

  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    if (selectedOption === "logout") {
      handleLogout();
      navigate("/login");
    } else if (selectedOption === "COMPANY") {
      navigate("/companydashboard");
      event.target.value = "";
    } else if (selectedOption === "CUSTOMER") {
      navigate("/customerdashboard");
      event.target.value = "";
    } else if (selectedOption === "ADMINISTRATOR") {
      navigate("/admindashboard");
      event.target.value = "";
    }
  };

  return (
    <div className="Header">
      <div className="logo">
        <img
          onClick={handleLogoClick}
          src="/assets/Golden Black Minimalist Elegant Apartment Logo (2).png"
          alt=""
        />
      </div>
      <Menu></Menu>
      {(clientType !== "ADMINISTRATOR" && clientType !== "COMPANY") ? (
        <NavLink to={"/checkout"} className={"cart"}>
          {cartItems > 0 ? <div>{cartItems}</div> : null}
          <ShoppingCartIcon />
        </NavLink>
      ) : null}
      {userName !== "" ? (
        <select className="logout" onChange={handleSelectChange}>
          <option value="">{userName}</option>
          <option value={clientType}>Dashboard</option>
          <option value="logout">LogOut</option>
        </select>
      ) : (
        <NavLink to={"/login"} className={"login"}>
          LOGIN
        </NavLink>
      )}
    </div>
  );
}

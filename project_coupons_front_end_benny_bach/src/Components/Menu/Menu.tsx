import "./Menu.css";
import { hover } from "@testing-library/user-event/dist/hover";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { authStore } from "../../Redux/AuthStore";
import { Social } from "./Social/Social";

const str = 'white';


export function Menu(): JSX.Element {
  

    return (
        <div className="Menu">
            <NavLink to={'/'} className={'menu-b'}>Home</NavLink>
            <NavLink to={'/coupons'} className={'menu-b'}>Coupons</NavLink>
            <NavLink to={'/aboutus'} className={'menu-b'}>About Us</NavLink>
            <Social/>
        </div>
    );
}

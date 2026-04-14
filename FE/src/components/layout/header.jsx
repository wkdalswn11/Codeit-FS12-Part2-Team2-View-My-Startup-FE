import React from "react";
import "./header.css";
import "../../../react.css";
import logo from "./img/logo1.png";
import { Link, NavLink } from "react-router-dom";
function Header() {
  return (
    <header>
      <div className="header-array">
        <Link to="/">
          <img src={logo} alt="View my startup" className="header-logo" />
        </Link>
        <div className="header-menu-interval">
          <NavLink to="/" end className="header-menu-name">
            나의 기업 비교
          </NavLink>
          <NavLink to="/compare" className="header-menu-name">
            비교 현황
          </NavLink>
          <NavLink to="/investments" className="header-menu-name">
            투자 현황
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;

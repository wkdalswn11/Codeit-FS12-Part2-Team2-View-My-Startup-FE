import React from "react";
import "./header.css";
import "../../../react.css";
import logo from "./img/logo1.png";
function Header() {
  return (
    <header>
      <div className="header-array">
        <img src={logo} alt="View my startup" className="header-logo" />
        <div className="header-menu-interval">
          <a href="/" className="header-menu-name">
            나의 기업 비교
          </a>
          <a href="/" className="header-menu-name">
            비교 현황
          </a>
          <a href="/" className="header-menu-name">
            투자 현황
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;

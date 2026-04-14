import React from "react";
import "./layout.css";
import "../../../react.css";

function Layout({ children, title }) {
  return (
    <div className="layout-wrapper">
      <main className="layout-container">
        <div className="layout-list-header">
          <h2 className="layout-list-title">{title}</h2>

          <div className="layout-list-controls">
            <div className="layout-search-bar">
              <input type="text" placeholder="검색어를 입력해주세요" />

              <span className="layout-search-icon">🔍</span>
            </div>

            <select className="layout-sort-select">
              <option>매출액 높은순</option>
              <option>투자 금액순</option>
            </select>
          </div>
        </div>

        {/* 실제 페이지별 내용  */}
        <div className="layout-content">{children}</div>
      </main>
    </div>
  );
}

export default Layout;

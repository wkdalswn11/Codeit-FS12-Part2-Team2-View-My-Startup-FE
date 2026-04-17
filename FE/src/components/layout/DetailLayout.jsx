import React from "react";
import "../../styles/layout.css";
import "../../../react.css";

function DetailLayout({ children, title }) {
  return (
    <div className="layout-wrapper">
      <main className="layout-container">
        <div className="layout-list-header">
          <h2 className="layout-list-title">{title}</h2>
        </div>

        <div className="layout-content">{children}</div>
      </main>
    </div>
  );
}

export default DetailLayout;

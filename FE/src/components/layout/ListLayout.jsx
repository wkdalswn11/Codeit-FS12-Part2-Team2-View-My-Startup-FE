import React from "react";
import "../../styles/layout.css";
import "../../../react.css";
import SelectedList from "../search/SelectedList";
import SearchBar from "../search/SearchBar";

function ListLayout({
  children,
  title,
  sortVariant,
  onSortChange,
  search,
  onSearchChange,
  onSearchSubmit,
  showSearch = true,
  categoryElement,
}) {
  return (
    <div className="layout-wrapper">
      <main className="layout-container">
        <div className="layout-list-header">
          <h2 className="layout-list-title">{title}</h2>

          <div className="layout-list-controls">
            {showSearch && (
              <SearchBar
                value={search}
                onChange={onSearchChange}
                onSubmit={onSearchSubmit}
              />
            )}
            {categoryElement && categoryElement}

            <SelectedList variant={sortVariant} onSortChange={onSortChange} />
          </div>
        </div>

        <div className="layout-content">{children}</div>
      </main>
    </div>
  );
}

export default ListLayout;

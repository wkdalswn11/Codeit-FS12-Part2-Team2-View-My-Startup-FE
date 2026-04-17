import React from "react";
import "../../styles/layout.css";

function SearchBar({ value, onChange, onSubmit }) {
  return (
    <div className="layout-search-bar">
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit?.();
          }
        }}
      />

      {/* <button
        type="button"
        className="layout-search-icon"
        onClick={() => onSubmit?.()}
      >
        🔍
      </button> */}
      <span className="layout-search-icon">🔍</span>
    </div>
  );
}

export default SearchBar;

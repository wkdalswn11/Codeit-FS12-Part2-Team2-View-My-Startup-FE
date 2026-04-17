import React, { useState } from "react";
import "../../styles/SelectedList.css";

// 상수로 옵션 리스트 정의 (컴포넌트 밖에서 관리)
const SORT_VARIANTS = {
  INVESTMENT: [
    { label: "누적 투자금액 높은순", value: "baseInvestment_desc" },
    { label: "누적 투자금액 낮은순", value: "baseInvestment_asc" },
    { label: "매출액 높은순", value: "revenue_desc" },
    { label: "매출액 낮은순", value: "revenue_asc" },
    { label: "고용 인원 많은순", value: "employeeCount_desc" },
    { label: "고용 인원 적은순", value: "employeeCount_asc" },
  ],
  MY_SELECTION: [
    { label: "나의 기업 선택 횟수 높은순", value: "favoriteCount_desc" },
    { label: "나의 기업 선택 횟수 낮은순", value: "favoriteCount_asc" },
    { label: "비교 기업 선택 횟수 높은순", value: "compareCount_desc" },
    { label: "비교 기업 선택 횟수 낮은순", value: "compareCount_asc" },
  ],
  VIEW_MY_STARTUP: [
    {
      label: "View My Startup 투자 금액 높은순",
      value: "siteInvestment_desc",
    },
    { label: "View My Startup 투자 금액 낮은순", value: "siteInvestment_asc" },
    {
      label: "실제 누적 투자 금액 높은순",
      value: "baseInvestment_desc",
    },
    {
      label: "실제 누적 투자 금액 낮은순",
      value: "baseInvestment_asc",
    },
  ],
};

function SelectedList({ variant = "INVESTMENT", onSortChange }) {
  const options = SORT_VARIANTS[variant] || SORT_VARIANTS.INVESTMENT;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSortChange) onSortChange(option.value);
  };

  return (
    <div className="SelectedList-container">
      {/* 선택된 영역 */}
      <div className="SelectedList-box" onClick={toggleDropdown}>
        <span>{selected.label}</span>
        <span className={`arrow ${isOpen ? "up" : ""}`}>⌵</span>
      </div>

      {/* 드롭다운 리스트 */}
      {isOpen && (
        <ul className="SelectedList-list">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={selected.value === opt.value ? "active" : ""}
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SelectedList;

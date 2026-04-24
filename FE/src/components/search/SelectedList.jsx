import React, { useState, useEffect } from "react";
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
  TREND_SELECTION: [
    { label: "최근 1일", value: "Today" },
    {
      label: "최근 7일",
      value: "7days",
    },
    {
      label: "최근 30일",
      value: "Month",
    },
  ],
  CATEGORY: [
    { label: "전체", value: "TOTAL" },
    { label: "IT", value: "IT" },
    { label: "FINANCE", value: "FINANCE" },
    { label: "HEALTHCARE", value: "HEALTHCARE" },
    { label: "EDUCATION", value: "EDUCATION" },
    { label: "ECOMMERCE", value: "ECOMMERCE" },
    { label: "OTHER", value: "OTHER" },
  ],
};

function SelectedList({ variant = "INVESTMENT", onSortChange, value }) {
  const options = SORT_VARIANTS[variant] || SORT_VARIANTS.INVESTMENT;
  const [isOpen, setIsOpen] = useState(false);

  // ✅ 초기 상태를 정할 때, 부모가 준 value가 있으면 그에 맞는 라벨을 먼저 찾습니다.
  const [selected, setSelected] = useState(() => {
    return options.find((opt) => opt.value === value) || options[0];
  });

  // ✅ [중요] 부모(Result.jsx)의 상태(rankSort)가 바뀌면 이 컴포넌트의 글자도 강제로 바꿉니다.
  useEffect(() => {
    if (value) {
      const matched = options.find((opt) => opt.value === value);
      if (matched) {
        setSelected(matched);
      }
    }
  }, [value, options]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSortChange) onSortChange(option.value);
  };

  return (
    <div className="SelectedList-container">
      <div className="SelectedList-box" onClick={toggleDropdown}>
        <span>{selected.label}</span>
        <span className={`arrow ${isOpen ? "up" : ""}`}>⌵</span>
      </div>

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

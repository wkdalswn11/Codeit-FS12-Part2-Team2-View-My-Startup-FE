import React from "react";
import "../../styles/compareCard.css";
import Button from "../ui/Button";

const CompareCard = ({
  variant = "add",
  company,
  onClick,
  onRemove,
  onAction,
  actionLabel,
}) => {
  if (variant === "add") {
    return (
      <div className="my-company-card my-company-card-empty" onClick={onClick}>
        <div className="my-company-card-plus">+</div>
        <p>기업 추가</p>
      </div>
    );
  }

  if (variant === "myCompany" && company) {
    return (
      <div className="my-company-card">
        <Button
          type="my-company-card-remove-btn"
          variant="Button-outline-gray"
          onClick={onAction}
        >
          {actionLabel}
        </Button>

        <div className="my-company-card-content">
          <img
            className="my-company-card-logo"
            src={company.logo || "/default.png"}
            alt={company.name}
          />
          <p className="my-company-card-name">{company.name}</p>
          <span className="my-company-card-category">
            {company.category ?? company.categoryName}
          </span>
        </div>
      </div>
    );
  }

  if (variant === "compareCompany" && company) {
    return (
      <div className="compare-company-card">
        <button
          type="button"
          className="compare-company-card-minus-btn"
          onClick={onRemove}
          aria-label={`${company.name} 선택 해제`}
        >
          −
        </button>

        <img
          className="compare-company-card-logo"
          src={company.logo || "/default.png"}
          alt={company.name}
        />

        <p className="compare-company-card-name">{company.name}</p>
        <span className="compare-company-card-category">
          {company.category ?? company.categoryName}
        </span>
      </div>
    );
  }

  if (variant === "emptyCompare") {
    return (
      <div className="compare-section-empty">
        아직 추가한 기업이 없어요,
        <br />
        버튼을 눌러 기업을 추가해보세요!
      </div>
    );
  }

  return null;
};

export default CompareCard;

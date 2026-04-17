import React from "react";
import "../../styles/compareCard.css";

const CompareCard = ({ type = "empty", company }) => {
  if (type === "add") {
    return (
      <article className="compare-card compare-card-add">
        <span className="compare-card-plus">+</span>
        <p className="compare-card-add-text">기업 추가</p>
      </article>
    );
  }

  if (type === "selected" && company) {
    return (
      <article className="compare-card compare-card-selected">
        <img
          src={company.logo || "https://placehold.co/80"}
          alt={company.name}
          className="compare-card-logo"
        />

        <div className="compare-card-content">
          <p className="compare-card-category">
            {company.categoryName || company.category}
          </p>
          <h3 className="compare-card-title">{company.name}</h3>
          <p className="compare-card-description">{company.description}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="compare-card compare-card-empty">
      <p className="compare-card-empty-text">어떤 기업이 궁금하세요?</p>
    </article>
  );
};

export default CompareCard;

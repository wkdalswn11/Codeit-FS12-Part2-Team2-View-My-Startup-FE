import React from "react";
import "../../styles/selectCompanyCard.css";

const SelectCompanyCard = ({ company }) => {
  return (
    <article className="select-company-card">
      <div className="select-company-card-header">
        <img
          src={company.logo || "https://placehold.co/56"}
          alt={company.name}
          className="select-company-card-logo"
        />

        <div className="select-company-card-info">
          <p className="select-company-card-category">
            {company.categoryName || company.category}
          </p>
          <h3 className="select-company-card-title">{company.name}</h3>
        </div>
      </div>

      <p className="select-company-card-description">{company.description}</p>
    </article>
  );
};

export default SelectCompanyCard;

import React from "react";
import "../../styles/companyCard.css";

const CompanyCard = ({
  type = "summary",
  label,
  value,
  title,
  description,
}) => {
  if (type === "description") {
    return (
      <section className="company-card-description">
        <h2 className="company-card-section-title">{title}</h2>
        <p className="company-card-description-text">{description}</p>
      </section>
    );
  }

  return (
    <div className="company-card-summary">
      <span className="company-card-label">{label}</span>
      <strong className="company-card-value">{value}</strong>
    </div>
  );
};

export default CompanyCard;

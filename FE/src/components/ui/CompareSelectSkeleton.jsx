import React from "react";
import "./compareSelectSkeleton.css";

const CompareSelectSkeleton = () => {
  return (
    <div className="compare-page">
      <div className="compare-page-container">
        <div className="compare-select-skeleton-title" />

        <div className="compare-select-skeleton-empty-card">
          <div className="compare-select-skeleton-empty-plus" />
          <div className="compare-select-skeleton-empty-text" />
        </div>

        <div className="compare-select-skeleton-submit-btn" />
      </div>
    </div>
  );
};

export default CompareSelectSkeleton;

import React from "react";
import Skeleton from "./Skeleton";

const DetailSkeleton = () => {
  return (
    <>
      <section className="detail-header">
        <Skeleton className="detail-logo detail-skeleton-logo" />
        <div className="detail-header-info">
          <Skeleton className="detail-skeleton-title" />
          <Skeleton className="detail-skeleton-category" />
        </div>
      </section>

      <section className="detail-summary">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="detail-card">
            <Skeleton className="detail-skeleton-card-label" />
            <Skeleton className="detail-skeleton-card-value" />
          </div>
        ))}
      </section>

      <section className="detail-description">
        <Skeleton className="detail-skeleton-section-title" />
        <Skeleton className="detail-skeleton-line" />
        <Skeleton className="detail-skeleton-line" />
        <Skeleton className="detail-skeleton-line detail-skeleton-line-short" />
        <Skeleton className="detail-skeleton-line" />
      </section>

      <section className="detail-investment">
        <div className="detail-investment-header">
          <Skeleton className="detail-skeleton-section-title" />
          <Skeleton className="detail-skeleton-button" />
        </div>

        <Skeleton className="detail-skeleton-total" />

        <div className="detail-table-header">
          <Skeleton className="detail-skeleton-table-text" />
          <Skeleton className="detail-skeleton-table-text" />
          <Skeleton className="detail-skeleton-table-text" />
          <Skeleton className="detail-skeleton-table-text" />
        </div>

        <div className="detail-investment-list">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="detail-investment-item">
              <Skeleton className="detail-skeleton-row-text" />
              <Skeleton className="detail-skeleton-row-text detail-skeleton-rank" />
              <Skeleton className="detail-skeleton-row-text detail-skeleton-amount" />
              <Skeleton className="detail-skeleton-row-text detail-skeleton-comment" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default DetailSkeleton;

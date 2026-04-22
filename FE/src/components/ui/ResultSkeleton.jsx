import React from "react";
import "./resultSkeleton.css";

const TableSkeletonRows = ({ columns = 6, rows = 5 }) => {
  return (
    <tbody className="startup-table-body">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="startup-table-row">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex}>
              <div className="result-skeleton-line result-skeleton-line-table" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const ResultSkeleton = () => {
  return (
    <div className="result-page">
      <main className="result-container">
        <section>
          <div className="result-section-header">
            <div className="result-skeleton-line result-skeleton-title" />
            <div className="result-skeleton-button" />
          </div>

          <div className="result-skeleton-selected-card">
            <div className="result-skeleton-logo" />
            <div className="result-skeleton-card-text">
              <div className="result-skeleton-line result-skeleton-name" />
              <div className="result-skeleton-line result-skeleton-category" />
            </div>
          </div>
        </section>

        <section>
          <div className="result-section-header">
            <div className="result-skeleton-line result-skeleton-title" />
            <div className="result-skeleton-select" />
          </div>

          <table className="startup-table mb-4">
            <thead className="startup-table-head">
              <tr>
                <th>기업 명</th>
                <th>기업 소개</th>
                <th>카테고리</th>
                <th>누적 투자금액</th>
                <th>매출액</th>
                <th>고용인원</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ height: "20px" }}></tr>
            </tbody>
            <TableSkeletonRows columns={6} rows={5} />
          </table>
        </section>

        <section>
          <div className="result-section-header">
            <div className="result-skeleton-line result-skeleton-title" />
            <div className="result-skeleton-select" />
          </div>

          <table className="startup-table mb-4">
            <thead className="startup-table-head">
              <tr>
                <th>순위</th>
                <th>기업 명</th>
                <th>기업 소개</th>
                <th>카테고리</th>
                <th>누적 투자금액</th>
                <th>매출액</th>
                <th>고용인원</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ height: "20px" }}></tr>
            </tbody>
            <TableSkeletonRows columns={7} rows={5} />
          </table>
        </section>

        <div className="result-button-container">
          <div className="result-skeleton-bottom-button" />
        </div>
      </main>
    </div>
  );
};

export default ResultSkeleton;

import React, { useEffect, useState } from "react";

const List = ({ companyList }) => {
  return (
    <table className="startup-table mb-4">
      <thead className="startup-table-head">
        <tr>
          <th>순위</th>
          <th>기업 명</th>
          <th>기업 소개</th>
          <th>카테고리</th>
          <th>누적 투자 금액</th>
          <th>매출액</th>
          <th>고용인원</th>
        </tr>
      </thead>
      <tbody>
        <tr className="startup-table-dummy"></tr>
      </tbody>
      <tbody className="startup-table-body">
        {companyList.map((company) => (
          <tr key={company.id} className="startup-table-row">
            <td>{company.rank}위</td>

            <td className="company-cell">
              <img
                src={company.logo || "https://placehold.co/50"}
                alt={company.name}
                className="company-logo"
              />
              <span>{company.name}</span>
            </td>

            <td className="desc-cell">{company.description}</td>
            <td>{company.categoryName || "-"}</td>
            <td>{company.totalInvestment?.toLocaleString() || 0}원</td>
            <td>{company.revenue?.toLocaleString() || 0}원</td>
            <td>{company.employeeCount || 0}명</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;

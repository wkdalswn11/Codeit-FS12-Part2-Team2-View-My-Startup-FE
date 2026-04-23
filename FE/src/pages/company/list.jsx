import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const List = ({ companyList }) => {
  return (
    <div className="startup-table-wrap">
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
          {companyList?.length === 0 ? (
            <tr>
              <td colSpan="7">조건에 맞는 결과가 없습니다</td>
            </tr>
          ) : (
            companyList.map((company) => (
              <tr key={company.id} className="startup-table-row">
                <td>{company.rank}위</td>

                <td className="company-cell">
                  <img
                    src={company.logo || "https://placehold.co/50"}
                    alt={company.name}
                    className="company-logo"
                  />
                  <span>
                    <Link to={`/companies/${company.id}`}>{company.name}</Link>
                  </span>
                </td>

                <td className="desc-cell">{company.description}</td>
                <td>{company.category || "-"}</td>
                <td>{company.baseInvestment?.toLocaleString() || 0}원</td>
                <td>{company.revenue?.toLocaleString() || 0}원</td>
                <td>{company.employeeCount || 0}명</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;

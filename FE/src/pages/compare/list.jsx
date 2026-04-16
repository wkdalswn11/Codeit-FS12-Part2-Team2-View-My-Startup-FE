import React, { useEffect, useState } from "react";

const List = ({ compareList }) => {
  return (
    <table className="startup-table mb-4">
      <thead className="startup-table-head">
        <tr>
          <th>순위</th>
          <th>기업 명</th>
          <th>기업 소개</th>
          <th>카테고리</th>
          <th>나의 기업 선택 횟수</th>
          <th>비교 기업 선택 횟수</th>
        </tr>
      </thead>
      <tbody>
        <tr className="startup-table-dummy"></tr>
      </tbody>
      <tbody className="startup-table-body">
        {compareList.map((compare) => (
          <tr key={compare.id} className="startup-table-row">
            <td>{compare.rank}위</td>

            <td className="company-cell">
              <img
                src={compare.logo || "https://placehold.co/50"}
                alt={compare.name}
                className="company-logo"
              />
              <span>{compare.name}</span>
            </td>

            <td className="desc-cell">{compare.description}</td>
            <td>{compare.category || "-"}</td>
            <td>나의 기업 선택 횟수</td>
            <td>비교 기업 선택 횟수</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;

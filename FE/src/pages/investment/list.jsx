import React from "react";

const List = ({ investmentList }) => {
  const sortedList = [...investmentList].sort(
    (a, b) => b.totalInvestment - a.totalInvestment,
  );
  return (
    <>
      <table className="startup-table mb-4">
        <thead className="startup-table-head">
          <tr>
            <th>순위</th>
            <th>기업 명</th>
            <th>기업 소개</th>
            <th>카테고리</th>
            <th>View My Startup 투자 금액</th>
            <th>실제 누적 투자금액</th>
          </tr>
        </thead>
        <tbody>
          <tr className="startup-table-dummy"></tr>
        </tbody>
        <tbody className="startup-table-body">
          {sortedList.map((investment) => (
            <tr key={investment.id} className="startup-table-row">
              <td>{investment.rank}위</td>

              <td className="company-cell">
                <img
                  src={investment.logo || "https://placehold.co/50"}
                  alt={investment.name}
                  className="company-logo"
                />
                <span>{investment.name}</span>
              </td>

              <td className="desc-cell">{investment.description}</td>

              <td>{investment.category}</td>

              <td>View My Startup 투자 금액 원</td>

              <td>{investment.totalInvestment.toLocaleString()}원</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default List;

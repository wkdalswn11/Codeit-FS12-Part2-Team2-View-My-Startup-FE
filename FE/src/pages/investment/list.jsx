import { useNavigate } from "react-router-dom";

const List = ({ investmentList }) => {
  const sortedList = [...investmentList].sort(
    (a, b) => b.totalInvestment - a.totalInvestment,
  );
  const navigate = useNavigate();
  return (
    <>
      <div className="startup-table-wrap">
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
            {sortedList?.length === 0 ? (
              <tr>
                <td colSpan="6">조건에 맞는 결과가 없습니다</td>
              </tr>
            ) : (
              sortedList.map((investment) => (
                <tr
                  key={investment.id}
                  className="startup-table-row cursor-pointer"
                  onClick={() => navigate(`/companies/${investment.id}`)}
                >
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

                  <td>
                    {Number(investment?.siteInvestment || 0).toLocaleString()}{" "}
                    원
                  </td>

                  <td>{investment?.baseInvestment?.toLocaleString()} 원</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List;

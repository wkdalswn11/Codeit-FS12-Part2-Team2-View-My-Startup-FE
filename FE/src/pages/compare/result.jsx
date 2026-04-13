import React from "react";
import CompareCard from "../../components/card/CompareCard";
import Button from "../../components/ui/Button";

const Result = () => {
  const companyList = [
    {
      id: 1,
      name: "Next AI",
      businessNumber: "123-45-67890",
      address: "Seoul, Korea",
      description:
        "코드잇은 온라인 코딩 교육 서비스를 운영하는 EdTech 스타트업입니다. 코딩 교육에 대한 수...",
      revenue: 120000000,
      employCount: 25,
      categoryName: "AI",
      logo: "https://placehold.co/50",
      baseInvestment: 5000000,
    },
    {
      id: 2,
      name: "Green Energy Lab",
      businessNumber: "987-65-43210",
      address: "Incheon, Korea",
      description:
        "코드잇은 온라인 코딩 교육 서비스를 운영하는 EdTech 스타트업입니다. 코딩 교육에 대한 수...",
      revenue: 80000000,
      employCount: 18,
      categoryName: "Energy",
      logo: "https://placehold.co/50",
      baseInvestment: 3000000,
    },
    {
      id: 3,
      name: "FoodTech Lab",
      businessNumber: "111-22-33333",
      address: "Busan, Korea",
      description:
        "코드잇은 온라인 코딩 교육 서비스를 운영하는 EdTech 스타트업입니다. 코딩 교육에 대한 수...",
      revenue: 45000000,
      employCount: 12,
      categoryName: "FoodTech",
      logo: "https://placehold.co/50",
      baseInvestment: 2000000,
    },
    {
      id: 4,
      name: "Smart Mobility",
      businessNumber: "222-33-44444",
      address: "Seoul, Korea",
      description:
        "코드잇은 온라인 코딩 교육 서비스를 운영하는 EdTech 스타트업입니다. 코딩 교육에 대한 수...",
      revenue: 98000000,
      employCount: 30,
      categoryName: "Mobility",
      logo: "https://placehold.co/50",
      baseInvestment: 7000000,
    },
    {
      id: 5,
      name: "HealthBridge",
      businessNumber: "333-44-55555",
      address: "Daegu, Korea",
      description:
        "코드잇은 온라인 코딩 교육 서비스를 운영하는 EdTech 스타트업입니다. 코딩 교육에 대한 수...",
      revenue: 65000000,
      employCount: 20,
      categoryName: "Healthcare",
      logo: "https://placehold.co/50",
      baseInvestment: 4000000,
    },
    {
      id: 6,
      name: "EduNext",
      businessNumber: "444-55-66666",
      address: "Daejeon, Korea",
      description:
        "코드잇은 온라인 코딩 교육 서비스를 운영하는 EdTech 스타트업입니다. 코딩 교육에 대한 수...",
      revenue: 55000000,
      employCount: 15,
      categoryName: "Education",
      logo: "https://placehold.co/50",
      baseInvestment: 3500000,
    },
    {
      id: 7,
      name: "FinTech Flow",
      businessNumber: "555-66-77777",
      address: "Seoul, Korea",
      description:
        "코드잇은 온라인 코딩 교육 서비스를 운영하는 EdTech 스타트업입니다. 코딩 교육에 대한 수...",
      revenue: 150000000,
      employCount: 40,
      categoryName: "FinTech",
      logo: "https://placehold.co/50",
      baseInvestment: 10000000,
    },
    {
      id: 8,
      name: "EcoBuild",
      businessNumber: "666-77-88888",
      address: "Ulsan, Korea",
      description:
        "코드잇은 온라인 코딩 교육 서비스를 운영하는 EdTech 스타트업입니다. 코딩 교육에 대한 수...",
      revenue: 72000000,
      employCount: 22,
      categoryName: "Construction",
      logo: "https://placehold.co/50",
      baseInvestment: 6000000,
    },
  ];
  const sortedList = [...companyList].sort((a, b) => b.revenue - a.revenue);
  return (
    <>
      <section>
        <h3>내가 선택한 기업</h3>
        {/* 기업추가 카드 들어갈 자리 */}
        <CompareCard />
      </section>
      <section>
        <h3>비교 결과 확인하기</h3>
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
          <tbody className="startup-table-body">
            {sortedList.map((company, index) => (
              <tr key={company.id} className="startup-table-row">
                <td className="company-cell">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="company-logo"
                  />
                  <span>{company.name}</span>
                </td>

                <td className="desc-cell">{company.description}</td>

                <td>{company.categoryName}</td>

                <td>{company.baseInvestment.toLocaleString()}원</td>
                <td>{company.revenue.toLocaleString()}원</td>
                <td>{company.employCount}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h3>기업 순위 확인하기</h3>
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
          <tbody className="startup-table-body">
            {sortedList.map((company, index) => (
              <tr key={company.id} className="startup-table-row">
                <td>{index + 1}위</td>
                <td className="company-cell">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="company-logo"
                  />
                  <span>{company.name}</span>
                </td>

                <td className="desc-cell">{company.description}</td>

                <td>{company.categoryName}</td>

                <td>{company.baseInvestment.toLocaleString()}원</td>
                <td>{company.revenue.toLocaleString()}원</td>
                <td>{company.employCount}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* 나의 기업에 투자하기 */}
      <Button />
    </>
  );
};

export default Result;

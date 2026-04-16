import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/companyDetail.css";

const mockCompanyDetail = {
  id: 1,
  name: "코드잇",
  category: "에듀테크",
  logo: "https://cdn.brandfetch.io/google.com?c=1idkDO95bvic4Gu9Oty",
  totalInvestment: "140억 원",
  revenue: "44.3억 원",
  employeeCount: "95명",
  description: `코드잇은 온라인 코딩 교육 서비스를 운영하는 EdTech 스타트업입니다.

코딩 교육과 데이터 사이언스 교육에 대한 수요는 급격히 늘어나고 있지만, 아직까지 좋은 교육 서비스를 찾기란 쉽지 않습니다. 이를 해결하고자 코드잇은 모든 강의를 자체 제작하여 퀄리티 높은 콘텐츠를 제공하고, 동시에 코딩 교육에 최적화된 플랫폼을 개발하고 있습니다.

모든 강의를 마음껏 들을 수 있는 "코드잇 무제한 멤버십"을 제공하고 있으며, 지난 5년 동안 21만 명의 수강생과 평균 만족도 4.9점이라는 국내 교육 업계에서 보기 드문 성과를 달성하였습니다. 또한 콘텐츠와 기술력을 인정받아 2021년 10월 Series B 투자를 받아 누적 140억 원의 투자를 받았고, 현재 40여 명의 팀원이 같은 목표를 향해 나아가고 있습니다.

"배움의 기쁨을 세상 모두에게."

이것이 코드잇의 비전입니다. 현재는 최고의 코딩 교육 서비스를 국내에서 제공하고 있지만, 이보다 더 큰 그림을 그리고 있습니다. 2021년 상반기부터 영어권 시장 진출을 시작했고, 코딩과 인접한 분야부터 스펙트럼을 넓혀 나갈 계획입니다.`,
  receivedInvestmentTotal: "총 200억 원",
  investments: [
    {
      id: 1,
      investorName: "김연우",
      rank: 1,
      amount: "10억",
      comment: "코드잇은 정말 훌륭한 기업입니다!",
    },
    {
      id: 2,
      investorName: "이유지",
      rank: 2,
      amount: "9억",
      comment: "코드잇의 성장 가능성은 무궁무진합니다!",
    },
    {
      id: 3,
      investorName: "안다혜",
      rank: 3,
      amount: "8억",
      comment: "최고의 기업! 코드잇!",
    },
    {
      id: 4,
      investorName: "신희성",
      rank: 4,
      amount: "7억",
      comment: "코드잇의 진출 분야는 무궁무진합니다.",
    },
    {
      id: 5,
      investorName: "이용섭",
      rank: 5,
      amount: "6억",
      comment: "교육업계의 라이징 스타 코드잇을 신뢰합니다.",
    },
    {
      id: 6,
      investorName: "박지훈",
      rank: 6,
      amount: "5억",
      comment: "장기적으로 더 크게 성장할 것 같습니다.",
    },
    {
      id: 7,
      investorName: "최서연",
      rank: 7,
      amount: "4억",
      comment: "서비스 방향성과 팀이 인상적입니다.",
    },
  ],
};

const Detail = () => {
  const [companyDetail, setCompanyDetail] = useState({
    investments: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 1,
  });

  const { id } = useParams();

  const userId = 1; // 임시고정

  useEffect(() => {
    setCompanyDetail(mockCompanyDetail);
    // const fetchData = async () => {
    //   const res = await fetch(
    //     `http://localhost:8080/companies/${id}?userId=${userId}`,
    //   );

    //   const data = await res.json();
    //   console.log(data);
    //   setCompanyDetail(data.data);
    // };
    // fetchData();
  }, [id, userId]);

  if (!companyDetail) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      {/* 페이지 상단 로고,회사명,카테고리 */}
      <section className="detail-header">
        <img
          src={companyDetail.logo || "https://placehold.co/50"}
          alt={companyDetail.name}
          className="detail-logo"
        />
        <div className="detail-header-info">
          <h1 className="detail-title">{companyDetail.name}</h1>
          <p className="detail-category">{companyDetail.category}</p>
        </div>
      </section>
      {/* 카드로 가져올 누자투자금액 매출액 고용인원 ( 상단 ) / 기업 소개 ( 하단 ) */}
      <section className="detail-summary">
        <div className="detail-card">
          <span className="detail-card-label">누적 투자 금액</span>
          <strong className="detail-card-value">
            {companyDetail.totalInvestment}
          </strong>
        </div>

        <div className="detail-card">
          <span className="detail-card-label">매출액</span>
          <strong className="detail-card-value">{companyDetail.revenue}</strong>
        </div>

        <div className="detail-card">
          <span className="detail-card-label">고용 인원</span>
          <strong className="detail-card-value">
            {companyDetail.employeeCount}
          </strong>
        </div>
      </section>
      <section className="detail-description">
        <h2 className="detail-section-title">기업 소개</h2>
        <p className="detail-description-text">{companyDetail.description}</p>
      </section>
      {/* View My Startup 에서 받은 투자 부분 */}
      <section className="detail-investment">
        <div className="detail-investment-header">
          <h2 className="detail-section-title">
            View My Startup에서 받은 투자
          </h2>
          <button className="detail-invest-button">기업투자하기</button>
        </div>

        <h3 className="detail-investment-total">
          {companyDetail.receivedInvestmentTotal}
        </h3>

        {/* 테이블 헤더 */}
        <div className="detail-table-header">
          <span>투자자 이름</span>
          <span>순위</span>
          <span>투자 금액</span>
          <span>투자 코멘트</span>
        </div>

        {/* 리스트 */}
        <div className="detail-investment-list">
          {companyDetail.investments?.map((item) => (
            <div key={item.id} className="detail-investment-item">
              <span className="detail-investor-name">{item.investorName}</span>
              <span className="detail-invest-rank">{item.rank}위</span>
              <span className="detail-invest-amount">{item.amount}</span>
              <span className="detail-invest-comment">{item.comment}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Detail;

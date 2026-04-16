import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/companyDetail.css";
import Button from "../../components/ui/Button";
import Pagination from "../../components/pagination/Pagination";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [companyDetail, setCompanyDetail] = useState({});
  const [investmentList, setInvestmentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 1,
  });

  const { id } = useParams();

  const userId = 1; // 임시고정

  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [companyRes, investmentRes] = await Promise.all([
          fetch(`http://localhost:8080/companies/${id}`),
          fetch(
            `http://localhost:8080/companies/${id}/investments?page=${currentPage}&limit=10`,
          ),
        ]);

        if (!companyRes.ok) {
          throw new Error(`회사 API 오류: ${companyRes.status}`);
        }

        if (!investmentRes.ok) {
          throw new Error(`투자 API 오류: ${investmentRes.status}`);
        }

        const companyData = await companyRes.json();
        const investmentData = await investmentRes.json();

        console.log(companyData);
        console.log(investmentData);

        setCompanyDetail(companyData.data || {});
        setInvestmentList(investmentData.data || []);
        setMeta(investmentData.meta || {});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentPage]);

  if (loading) {
    return <div style={{ color: "red" }}>로딩 중...</div>;
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
            {companyDetail?.baseInvestment?.toLocaleString()} 원
          </strong>
        </div>

        <div className="detail-card">
          <span className="detail-card-label">매출액</span>
          <strong className="detail-card-value">
            {companyDetail?.revenue?.toLocaleString() ?? 0} 원
          </strong>
        </div>

        <div className="detail-card">
          <span className="detail-card-label">고용 인원</span>
          <strong className="detail-card-value">
            {companyDetail.employeeCount} 명
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
          <Button type="Button-large" variant="Button-primary">
            기업 투자하기
          </Button>
        </div>

        <h3 className="detail-investment-total">
          {companyDetail.siteInvestment} 원
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
          {!investmentList?.length ? (
            <div className="empty-investment">투자내역이 존재하지 않습니다</div>
          ) : (
            investmentList.map((item) => (
              <div key={item.id} className="detail-investment-item">
                <span className="detail-investor-name">{item.userName}</span>
                <span className="detail-invest-rank">{item.rank}위</span>
                <span className="detail-invest-amount">
                  {item?.amount?.toLocaleString()}원
                </span>
                <span className="detail-invest-comment">{item.comment}</span>
              </div>
            ))
          )}
        </div>
      </section>
      <Pagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Detail;

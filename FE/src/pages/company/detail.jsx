import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyCard from "../../components/card/CompanyCard";
import "../../styles/companyDetail.css";
import Button from "../../components/ui/Button";
import Pagination from "../../components/pagination/Pagination";
import DetailSkeleton from "../../components/ui/DetailSkeleton";

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
    return <DetailSkeleton />;
  }

  return (
    <>
      <section className="detail-header">
        <img
          src={companyDetail.logo || "https://placehold.co/80"}
          alt={companyDetail.name}
          className="detail-logo"
        />
        <div className="detail-header-info">
          <h1 className="detail-title">{companyDetail.name}</h1>
          <p className="detail-category">{companyDetail.category}</p>
        </div>
      </section>

      <section className="detail-summary">
        <CompanyCard
          type="summary"
          label="누적 투자 금액"
          value={`${companyDetail?.baseInvestment?.toLocaleString() ?? 0} 원`}
        />
        <CompanyCard
          type="summary"
          label="매출액"
          value={`${companyDetail?.revenue?.toLocaleString() ?? 0} 원`}
        />
        <CompanyCard
          type="summary"
          label="고용 인원"
          value={`${companyDetail?.employeeCount ?? 0} 명`}
        />
      </section>

      <CompanyCard
        type="description"
        title="기업 소개"
        description={companyDetail.description || "기업 소개 정보가 없습니다."}
      />

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
          총 {companyDetail?.siteInvestment?.toLocaleString() ?? 0} 원
        </h3>

        <div className="detail-table-header">
          <span>투자자 이름</span>
          <span>순위</span>
          <span>투자 금액</span>
          <span>투자 코멘트</span>
        </div>

        <div className="detail-investment-list">
          {!investmentList?.length ? (
            <div className="empty-investment">투자내역이 존재하지 않습니다</div>
          ) : (
            investmentList.map((item) => (
              <div key={item.id} className="detail-investment-item">
                <span className="detail-investor-name">{item.userName}</span>
                <span className="detail-invest-rank">{item.rank}위</span>
                <span className="detail-invest-amount">
                  {item?.amount?.toLocaleString() ?? 0}원
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

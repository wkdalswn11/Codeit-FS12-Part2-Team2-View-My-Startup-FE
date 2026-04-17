import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/companyDetail.css";
import Button from "../../components/ui/Button";
import Pagination from "../../components/pagination/Pagination";
import DetailSkeleton from "../../components/ui/DetailSkeleton";
import ProtectedDetailLayout from "../../components/layout/ProtectedDetailLayout";
import {
  getCompanyDetail,
  getCompanyInvestments,
} from "../../services/companyApi";

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

        const [companyData, investmentData] = await Promise.all([
          getCompanyDetail(id),
          getCompanyInvestments({
            id,
            page: currentPage,
            limit: 10,
          }),
        ]);

        setCompanyDetail(companyData.data || {});
        setInvestmentList(investmentData.data || []);
        setMeta(
          investmentData.meta || {
            page: 1,
            limit: 5,
            total: 0,
            totalPages: 1,
          },
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentPage]);

  return (
    <ProtectedDetailLayout title="기업 상세">
      {loading ? (
        <DetailSkeleton />
      ) : (
        <>
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

          <section className="detail-summary">
            <div className="detail-card">
              <span className="detail-card-label">누적 투자 금액</span>
              <strong className="detail-card-value">
                {companyDetail?.baseInvestment?.toLocaleString() ?? 0} 원
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
                {companyDetail?.employeeCount ?? 0} 명
              </strong>
            </div>
          </section>

          <section className="detail-description">
            <h2 className="detail-section-title">기업 소개</h2>
            <p className="detail-description-text">
              {companyDetail.description}
            </p>
          </section>

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
                <div className="empty-investment">투자 내역이 없습니다.</div>
              ) : (
                investmentList.map((item) => (
                  <div key={item.id} className="detail-investment-item">
                    <span className="detail-investor-name">
                      {item.userName}
                    </span>
                    <span className="detail-invest-rank">{item.rank}위</span>
                    <span className="detail-invest-amount">
                      {item?.amount?.toLocaleString() ?? 0}원
                    </span>
                    <span className="detail-invest-comment">
                      {item.comment}
                    </span>
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
      )}
    </ProtectedDetailLayout>
  );
};

export default Detail;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/result.css";
import Button from "../../components/ui/Button";
import ListSkeleton from "../../components/ui/ListSkeleton";
import SelectedList from "../../components/search/SelectedList";
import SelectCompanyModal from "../../components/modal/SelectCompanyModal";

const Result = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const storedUser = localStorage.getItem("mystartup_user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const USER_ID = user?.id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [rankList, setRankList] = useState([]);
  const [compareSort, setCompareSort] = useState("baseInvestment_desc");
  const [rankSort, setRankSort] = useState("baseInvestment_desc");

  //카드부분
  const renderSelectedCard = () => {
    if (loading)
      return <div className="loading-placeholder">데이터 로딩 중...</div>;

    if (compareList.length === 0) {
      return (
        <div className="custom-empty-card">
          <p>아직 선택된 기업이 없습니다.</p>
        </div>
      );
    }
    const company = compareList[0];
    return (
      <div className="result-custom-selected-card">
        <div className="result-card-logo-wrapper">
          <img
            src={company.logo || "https://placehold.co/80"}
            alt={company.name}
            className="result-card-main-logo"
          />
        </div>
        <div className="result-card-info-wrapper">
          <h3 className="result-card-company-name">{company.name}</h3>
          <p className="result-card-company-category">
            {company.categoryName || company.category || "카테고리 없음"}
          </p>
        </div>
      </div>
    );
  };
  // 정렬기능
  const getSortedData = (data, currentSortValue) => {
    // currentSortValue 인자 추가
    if (!data || data.length === 0) return [];

    return [...data].sort((a, b) => {
      const [column, order] = currentSortValue.split("_");

      const valA = a[column] || 0;
      const valB = b[column] || 0;

      return order === "desc" ? valB - valA : valA - valB;
    });
  };
  const sortedCompareList = getSortedData(compareList, compareSort);
  const sortedRankList = getSortedData(rankList, rankSort);

  // API 호출 함수
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const resCompare = await fetch(`${BASE_URL}/users/${USER_ID}/selections`);
      if (!resCompare.ok) throw new Error("비교 리스트 로드 실패");
      const resultCompare = await resCompare.json();
      setCompareList(resultCompare.data || []);

      const resRank = await fetch(
        `${BASE_URL}/users/${USER_ID}/selections/ranking`,
      );
      if (!resRank.ok) throw new Error("전체 순위 로드 실패");
      const resultRank = await resRank.json();
      setRankList(resultRank.data || []);
    } catch (error) {
      console.error("데이터 로드 중 에러 발생:", error);
    } finally {
      setLoading(false);
    }
  }, [USER_ID]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCompanySelect = async (company) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${USER_ID}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId: company.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "선택 실패");
        return;
      }

      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("비교 기업 등록 에러:", error);
    }
  };

  if (loading)
    return <div className="loading-state">데이터를 불러오는 중입니다...</div>;

  return (
    <div className="result-page">
      <main className="result-container">
        {/* 카드부분 */}
        <section>
          <div className="result-section-header">
            <h2 className="result-section-title">내가 선택한 기업</h2>
            <Button
              type="Button-medium"
              variant="Button-primary"
              onClick={() => navigate(`/selectCompany/${USER_ID}`)}
            >
              다른 기업 비교하기
            </Button>
          </div>

          <div>{renderSelectedCard()}</div>
        </section>

        {/* 비교결과 확인하기 리스트 */}
        <section>
          <div className="result-section-header">
            <h2 className="result-section-title">비교 결과 확인하기</h2>
            <SelectedList
              variant="INVESTMENT"
              onSortChange={(value) => setCompareSort(value)}
            />
          </div>
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
              {sortedCompareList.map((company, index) => (
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

                  <td>{company.category || "-"}</td>

                  <td>{company.baseInvestment.toLocaleString()}원</td>
                  <td>{company.revenue.toLocaleString()}원</td>
                  <td>{company.employeeCount || 0}명</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 기업순위 확인하기 리스트 */}
        <section>
          <div className="result-section-header">
            <h2 className="result-section-title">기업 순위 확인하기</h2>
            <SelectedList
              variant="INVESTMENT"
              onSortChange={(value) => setRankSort(value)}
            />
          </div>
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
              {sortedRankList.map((company, index) => (
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

                  <td>{company.category || "-"}</td>

                  <td>{company.baseInvestment.toLocaleString()}원</td>
                  <td>{company.revenue.toLocaleString()}원</td>
                  <td>{company.employeeCount || 0}명</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 나의 기업 투자하기 버튼 모달 페이지 */}
        <div className="result-button-container">
          <Button type="Button-large" variant="Button-primary">
            나의 기업에 투자하기
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Result;

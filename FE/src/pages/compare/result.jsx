import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/result.css";
import Button from "../../components/ui/Button";
import ListSkeleton from "../../components/ui/ListSkeleton";
import SelectedList from "../../components/search/SelectedList";
import useUserStore from "../../store/userStore";
import ResultSkeleton from "../../components/ui/ResultSkeleton";

const Result = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const user = useUserStore((state) => state.user);
  const USER_ID = user?.id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [rankList, setRankList] = useState([]);

  const [compareSort, setCompareSort] = useState("baseInvestment_desc");
  const [rankSort, setRankSort] = useState("baseInvestment_desc");
  const companyId = compareList[0]?.id;

  //카드부분
  const renderSelectedCard = () => {
    if (loading) return <div>데이터 로딩 중...</div>;

    if (compareList.length === 0) {
      return (
        <div className="custom-empty-card">
          <p>아직 선택된 기업이 없습니다.</p>
        </div>
      );
    }

    const company = compareList[0]; // 가장 최근/첫 번째 선택 기업
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

  const getSortedData = (data, currentSortValue) => {
    if (!data || data.length === 0) return [];

    return [...data].sort((a, b) => {
      // "baseInvestment_desc" -> ["baseInvestment", "desc"]로 분리
      const [column, order] = currentSortValue.split("_");

      const valA = a[column] || 0;
      const valB = b[column] || 0;

      // 내림차순(desc)이면 큰 값이 위로, 아니면 작은 값이 위로
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

  const handleGoToDetail = () => {
    // compareList의 첫 번째 기업(카드에 표시된 기업)을 가져옵니다.
    const myCompany = compareList.length > 0 ? compareList[0] : null;

    if (myCompany && myCompany.id) {
      // 상세 페이지 경로가 /detail/:id 인 경우
      navigate(`/companies/${companyId}`);
    } else {
      alert("선택된 기업이 없습니다. 기업을 먼저 선택해주세요!");
    }
  };

  if (loading) return <ResultSkeleton />;

  return (
    <div className="result-page">
      <main className="result-container">
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
                  <td>{company.rank}위</td>
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

        <div className="result-button-container">
          <Button
            type="Button-large"
            variant="Button-primary"
            onClick={handleGoToDetail}
          >
            나의 기업에 투자하기
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Result;

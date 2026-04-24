import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/result.css";
import Button from "../../components/ui/Button";
import SelectedList from "../../components/search/SelectedList";
import useUserStore from "../../store/userStore";
import ResultSkeleton from "../../components/ui/ResultSkeleton";
import InputModal from "../../components/modal/InputModal";
import { createCompanyInvestment } from "../../services/investmentApi";
import AlertModal from "../../components/modal/AlertModal";

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
  const [rankSort, setRankSort] = useState("revenue_desc");

  const [submitting, setSubmitting] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const targetCompany = compareList[0];

  //카드부분
  const renderSelectedCard = () => {
    if (loading) return <div>데이터 로딩 중...</div>;

    if (compareList.length === 0) {
      return (
        <div className="result-custom-empty-card">
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

  // API 호출 함수
  const fetchData = useCallback(async () => {
    if (!USER_ID) return;

    try {
      setLoading(true);
      // 백엔드 명세에 맞춰 sort 파라미터를 추가합니다.
      const [resCompare, resRank] = await Promise.all([
        fetch(`${BASE_URL}/users/${USER_ID}/selections`),
        fetch(
          `${BASE_URL}/users/${USER_ID}/selections/ranking?sort=${rankSort}`,
        ),
      ]);

      if (!resCompare.ok || !resRank.ok) throw new Error("데이터 로드 실패");

      const [resultCompare, resultRank] = await Promise.all([
        resCompare.json(),
        resRank.json(),
      ]);

      // 백엔드에서 정렬해준 순서 그대로 저장
      setCompareList(resultCompare.data || []);
      setRankList(resultRank.data || []);
    } catch (error) {
      console.error("데이터 로드 중 에러 발생:", error);
    } finally {
      setLoading(false);
    }
  }, [USER_ID, BASE_URL, compareSort, rankSort]); // sort 상태가 바뀌면 다시 실행됨

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 비교 결과 확인하기
  const getSortedCompareList = () => {
    if (!compareList.length) return [];
    const [column, order] = compareSort.split("_");
    return [...compareList].sort((a, b) => {
      const valA = a[column] || 0;
      const valB = b[column] || 0;
      return order === "desc" ? valB - valA : valA - valB;
    });
  };

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

  // 나의 기업에 투자하기
  const handleInvestmentClick = async () => {
    if (!user || !USER_ID) {
      setAlertMessage("로그인 후 이용 가능합니다.");
      setAlertOpen(true);
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/users/${USER_ID}/investments/${targetCompany.id}`,
      );

      if (response.ok) {
        navigate(`/companies/${targetCompany.id}`);
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      setIsModalOpen(true);
    }
  };

  // InputModal에서 호출할 실제 투자 API 로직 (Detail.jsx의 handleCreateInvestment 참고)
  const handleInvestSubmit = async (data) => {
    try {
      setSubmitting(true);
      const response = await fetch(`${BASE_URL}/users/${USER_ID}/investments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(data.amount),
          comment: data.comment,
        }),
      });

      if (!response.ok) throw new Error("투자 요청 실패");

      setAlertMessage("투자가 완료되었습니다!");
      setAlertOpen(true);
      setIsModalOpen(false);
      navigate(`/companies/${targetCompany.id}`);
    } catch (err) {
      setAlertMessage(err.message);
      setAlertOpen(true);
    } finally {
      setSubmitting(false);
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
          <div className="startup-table-wrap">
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
                {getSortedCompareList().map((company, index) => (
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
          </div>
        </section>

        <section>
          <div className="result-section-header">
            <h2 className="result-section-title">기업 순위 확인하기</h2>
            {!loading && (
              <SelectedList
                variant="INVESTMENT"
                value={rankSort}
                onSortChange={(value) => setRankSort(value)}
              />
            )}
          </div>
          <div className="startup-table-wrap">
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
                {rankList.map((company, index) => (
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
          </div>
        </section>

        <div className="result-button-container">
          <Button
            type="Button-large"
            variant="Button-primary"
            onClick={handleInvestmentClick}
          >
            나의 기업에 투자하기
          </Button>
        </div>
      </main>
      {isModalOpen && (
        <InputModal
          onClose={() => setIsModalOpen(false)}
          company={targetCompany}
          user={user}
          onSubmit={handleInvestSubmit} // API 로직을 부모(Result)에서 처리하도록 전달
          submitting={submitting}
        />
      )}

      {/* 알림 모달 */}
      <AlertModal
        isOpen={alertOpen}
        message={alertMessage}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
};

export default Result;

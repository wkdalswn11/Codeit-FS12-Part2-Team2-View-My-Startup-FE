import { useEffect, useState } from "react";
import "./CompareSelectPage.css";
import SelectCompanyModal from "../../components/modal/SelectCompanyModal";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import {
  deleteCompareCompany,
  deleteMyCompany,
  getCompareCompanies,
  getMyCompany,
  resetAllSelections,
} from "../../services/compareApi";

const CompareSelectPage = () => {
  const user = useUserStore((state) => state.user);
  const USER_ID = user?.id;

  const navigate = useNavigate();
  const [myCompany, setMyCompany] = useState(null);
  const [compareCompanies, setCompareCompanies] = useState([]);
  const [modalMode, setModalMode] = useState(null);

  const fetchMyCompany = async () => {
    if (!USER_ID) return;

    try {
      const company = await getMyCompany(USER_ID);
      setMyCompany(company);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCompareCompanies = async () => {
    if (!USER_ID) return;

    try {
      const companies = await getCompareCompanies(USER_ID);
      setCompareCompanies(companies);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectMyCompany = (company) => {
    setMyCompany(company);
    setModalMode(null);
  };

  const handleSelectCompareCompanies = (companies) => {
    setCompareCompanies(companies);
  };

  const handleResetMyCompany = async () => {
    if (!USER_ID || !myCompany) return;

    try {
      await deleteMyCompany(USER_ID, myCompany.id);
      setMyCompany(null);
      setCompareCompanies([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveCompareCompany = async (companyId) => {
    if (!USER_ID) return;

    try {
      await deleteCompareCompany(USER_ID, companyId);

      setCompareCompanies((prev) =>
        prev.filter((company) => company.id !== companyId),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetAllCompares = async () => {
    if (!USER_ID || compareCompanies.length === 0) return;

    try {
      await resetAllSelections(USER_ID, compareCompanies);
      setMyCompany(null);
      setCompareCompanies([]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!USER_ID) return;

    fetchMyCompany();
    fetchCompareCompanies();
  }, [USER_ID]);

  return (
    <div className="compare-page">
      <div className="compare-page__container">
        <h2 className="compare-page__title">나의 기업을 선택해 주세요!</h2>

        {!myCompany ? (
          <>
            <div
              className="my-company-card my-company-card--empty"
              onClick={() => setModalMode("favorite")}
            >
              <div className="my-company-card__plus">+</div>
              <p>기업 추가</p>
            </div>

            <button className="compare-submit-btn" disabled>
              기업 비교하기
            </button>
          </>
        ) : (
          <>
            <section className="my-company-section">
              <div className="my-company-section__top">
                <button
                  className="compare-reset-all-btn"
                  onClick={handleResetAllCompares}
                  disabled={compareCompanies.length === 0}
                >
                  ↻ 전체 초기화
                </button>
              </div>

              <div className="my-company-card">
                <button
                  className="my-company-card__remove-btn"
                  onClick={handleResetMyCompany}
                >
                  선택 취소
                </button>

                <div className="my-company-card__content">
                  <img
                    className="my-company-card__logo"
                    src={myCompany.logo || "/default.png"}
                    alt={myCompany.name}
                  />
                  <p className="my-company-card__name">{myCompany.name}</p>
                  <span className="my-company-card__category">
                    {myCompany.category ?? myCompany.categoryName}
                  </span>
                </div>
              </div>
            </section>

            <section className="compare-section">
              <div className="compare-section__header">
                <h3 className="compare-section__title">
                  어떤 기업이 궁금하세요? <span>(최대 5개)</span>
                </h3>

                <button
                  className="compare-section__add-btn"
                  onClick={() => setModalMode("compare")}
                  disabled={compareCompanies.length >= 5}
                >
                  기업 추가하기
                </button>
              </div>

              <div className="compare-section__board">
                {compareCompanies.length === 0 ? (
                  <div className="compare-section__empty">
                    아직 추가한 기업이 없어요,
                    <br />
                    버튼을 눌러 기업을 추가해보세요!
                  </div>
                ) : (
                  <div className="compare-company-grid">
                    {compareCompanies.map((company) => (
                      <div key={company.id} className="compare-company-card">
                        <button
                          className="compare-company-card__minus-btn"
                          onClick={() => handleRemoveCompareCompany(company.id)}
                          aria-label={`${company.name} 선택 해제`}
                        >
                          −
                        </button>

                        <img
                          className="compare-company-card__logo"
                          src={company.logo || "/default.png"}
                          alt={company.name}
                        />

                        <p className="compare-company-card__name">
                          {company.name}
                        </p>
                        <span className="compare-company-card__category">
                          {company.category ?? company.categoryName}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <button
              className="compare-submit-btn"
              disabled={compareCompanies.length === 0}
              onClick={() => navigate(`/companies/${USER_ID}/result`)}
            >
              기업 비교하기
            </button>
          </>
        )}

        {modalMode && (
          <SelectCompanyModal
            mode={modalMode}
            onClose={() => setModalMode(null)}
            onSelectFavorite={handleSelectMyCompany}
            onSelectCompare={handleSelectCompareCompanies}
            selectedCompanyId={myCompany?.id}
            selectedCompareIds={compareCompanies.map((company) => company.id)}
          />
        )}
      </div>
    </div>
  );
};

export default CompareSelectPage;

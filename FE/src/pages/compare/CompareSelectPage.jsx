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
import Button from "../../components/ui/Button";

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
      <div className="compare-page-container">
        <h2 className="compare-page-title">나의 기업을 선택해 주세요!</h2>

        {!myCompany ? (
          <>
            <div
              className="my-company-card my-company-card-empty"
              onClick={() => setModalMode("favorite")}
            >
              <div className="my-company-card-plus">+</div>
              <p>기업 추가</p>
            </div>

            <Button
              className="compare-submit-btn"
              type="Button-large"
              variant="Button-primary"
              disabled={compareCompanies.length === 0}
            >
              기업 비교하기
            </Button>
          </>
        ) : (
          <>
            <section className="my-company-section">
              <div className="my-company-section-top">
                <Button
                  type="Button-medium"
                  variant="Button-primary"
                  icon="↻"
                  onClick={handleResetAllCompares}
                  disabled={compareCompanies.length === 0}
                >
                  전체 초기화
                </Button>
              </div>

              <div className="my-company-card">
                <Button
                  type="my-company-card-remove-btn"
                  variant="Button-outline-gray"
                  onClick={handleResetMyCompany}
                >
                  선택 취소
                </Button>

                <div className="my-company-card-content">
                  <img
                    className="my-company-card-logo"
                    src={myCompany.logo || "/default.png"}
                    alt={myCompany.name}
                  />
                  <p className="my-company-card-name">{myCompany.name}</p>
                  <span className="my-company-card-category">
                    {myCompany.category ?? myCompany.categoryName}
                  </span>
                </div>
              </div>
            </section>

            <section className="compare-section">
              <div className="compare-section-header">
                <h3 className="compare-section-title">
                  어떤 기업이 궁금하세요? <span>(최대 5개)</span>
                </h3>

                <Button
                  type="Button-medium"
                  variant="Button-primary"
                  onClick={() => setModalMode("compare")}
                  disabled={compareCompanies.length >= 5}
                >
                  기업 추가하기
                </Button>
              </div>

              <div className="compare-section-board">
                {compareCompanies.length === 0 ? (
                  <div className="compare-section-empty">
                    아직 추가한 기업이 없어요,
                    <br />
                    버튼을 눌러 기업을 추가해보세요!
                  </div>
                ) : (
                  <div className="compare-company-grid">
                    {compareCompanies.map((company) => (
                      <div key={company.id} className="compare-company-card">
                        <button
                          className="compare-company-card-minus-btn"
                          onClick={() => handleRemoveCompareCompany(company.id)}
                          aria-label={`${company.name} 선택 해제`}
                        >
                          −
                        </button>

                        <img
                          className="compare-company-card-logo"
                          src={company.logo || "/default.png"}
                          alt={company.name}
                        />

                        <p className="compare-company-card-name">
                          {company.name}
                        </p>
                        <span className="compare-company-card-category">
                          {company.category ?? company.categoryName}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <Button
              className="compare-submit-btn"
              type="Button-large"
              variant="Button-primary"
              disabled={compareCompanies.length === 0}
              onClick={() => navigate(`/companies/${USER_ID}/result`)}
            >
              기업 비교하기
            </Button>
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

import { useEffect, useState } from "react";
import "../../styles/pagination.css";
import "./SelectCompanyModal.css";
import SearchBar from "../search/SearchBar";
import Pagination from "../pagination/Pagination";
import AlertModal from "./AlertModal";
import useDebounce from "../../hook/useDebounce";

const storedUser = localStorage.getItem("mystartup_user");
const user = storedUser ? JSON.parse(storedUser) : null;
const USER_ID = user?.id;

const SelectCompanyModal = ({
  mode,
  onClose,
  onSelectFavorite,
  onSelectCompare,
  selectedCompanyId,
  selectedCompareIds = [],
}) => {
  const [recentCompanies, setRecentCompanies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 500);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [localCompareIds, setLocalCompareIds] = useState(selectedCompareIds);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (mode === "favorite") {
      fetchRecentFavoriteCompanies();
    } else if (mode === "compare") {
      fetchSelectedCompareCompanies();
    }
  }, [mode]);

  useEffect(() => {
    setLocalCompareIds(selectedCompareIds);
  }, [selectedCompareIds]);

  useEffect(() => {
    setCurrentPage(1);
    fetchSearchResults(1, debouncedKeyword);
  }, [debouncedKeyword]);

  const fetchRecentFavoriteCompanies = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/users/${USER_ID}/favorites/last`,
      );

      if (!res.ok) throw new Error(`조회 실패: ${res.status}`);

      const data = await res.json();
      const companies = data.data || [];
      setRecentCompanies(companies);
    } catch (err) {
      console.error(err);
    }
  };

  const syncCompareCompanies = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/users/${USER_ID}/compares`,
      );

      if (!res.ok) throw new Error(`비교 기업 조회 실패: ${res.status}`);

      const data = await res.json();
      const companies = data.data || [];

      setRecentCompanies(companies);
      setLocalCompareIds(companies.map((c) => c.id));
      onSelectCompare?.(companies);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSelectedCompareCompanies = async () => {
    await syncCompareCompanies();
  };

  const fetchSearchResults = async (page = 1, searchKeyword = keyword) => {
    try {
      const res = await fetch(
        `http://localhost:8080/companies?keyword=${searchKeyword}&page=${page}&limit=5`,
      );

      if (!res.ok) throw new Error("검색 실패");

      const data = await res.json();
      const companies = data.data || [];
      const total = data.meta?.totalPages || 1;

      setSearchResults(companies);
      setTotalPages(total);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFavoriteSelect = async (company) => {
    const isSelected = selectedCompanyId === company.id;

    try {
      if (isSelected) {
        await fetch(
          `http://localhost:8080/users/${USER_ID}/favorites/${company.id}`,
          { method: "DELETE" },
        );
        onSelectFavorite?.(null);
      } else {
        await fetch(`http://localhost:8080/users/${USER_ID}/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyId: company.id }),
        });
        onSelectFavorite?.(company);
      }

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCompareSelect = async (company) => {
    if (company.id === selectedCompanyId) {
      setAlertMessage("나의 기업은 선택할 수 없습니다.");
      setAlertOpen(true);
      return;
    }

    const isSelected = localCompareIds.includes(company.id);

    try {
      if (isSelected) {
        const res = await fetch(
          `http://localhost:8080/users/${USER_ID}/compares/${company.id}`,
          { method: "DELETE" },
        );

        if (!res.ok) throw new Error("삭제 실패");

        await syncCompareCompanies();
      } else {
        if (localCompareIds.length >= 5) {
          setAlertMessage("비교 기업은 최대 5개까지 선택할 수 있습니다.");
          setAlertOpen(true);
          return;
        }

        const res = await fetch(
          `http://localhost:8080/users/${USER_ID}/compares`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ companyId: company.id }),
          },
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "에러 발생");
        }

        await syncCompareCompanies();
      }
    } catch (err) {
      console.error(err);
      setAlertMessage(err.message || "오류가 발생했습니다.");
      setAlertOpen(true);
    }
  };

  const handleSelect = (company) => {
    if (mode === "favorite") {
      handleFavoriteSelect(company);
    } else if (mode === "compare") {
      handleCompareSelect(company);
    }
  };

  const isCompanySelected = (companyId) => {
    if (mode === "favorite") {
      return selectedCompanyId === companyId;
    }
    if (mode === "compare") {
      return localCompareIds.includes(companyId);
    }
    return false;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchSearchResults(page, debouncedKeyword);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h2>
              {mode === "favorite"
                ? "나의 기업 선택하기"
                : "비교 기업 선택하기"}
            </h2>

            <button className="modal-close" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M16.3778 18.0541L11.2429 23.189C10.9519 23.48 10.6096 23.6255 10.2159 23.6255C9.8222 23.6255 9.47987 23.48 9.18889 23.189C8.89791 22.898 8.75242 22.5557 8.75242 22.162C8.75242 21.7684 8.89791 21.426 9.18889 21.135L14.3238 16.0001L9.18889 10.8652C8.89791 10.5742 8.75242 10.2319 8.75242 9.83822C8.75242 9.44454 8.89791 9.10221 9.18889 8.81123C9.47987 8.52025 9.8222 8.37476 10.2159 8.37476C10.6096 8.37476 10.9519 8.52025 11.2429 8.81123L16.3778 13.9462L21.5127 8.81123C21.8037 8.52025 22.146 8.37476 22.5397 8.37476C22.9334 8.37476 23.2757 8.52025 23.5667 8.81123C23.8576 9.10221 24.0031 9.44454 24.0031 9.83822C24.0031 10.2319 23.8576 10.5742 23.5667 10.8652L18.4317 16.0001L23.5667 21.135C23.8576 21.426 24.0031 21.7684 24.0031 22.162C24.0031 22.5557 23.8576 22.898 23.5667 23.189C23.2757 23.48 22.9334 23.6255 22.5397 23.6255C22.146 23.6255 21.8037 23.48 21.5127 23.189L16.3778 18.0541Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>

          <SearchBar
            value={keyword}
            onChange={setKeyword}
            onSubmit={() => {
              setCurrentPage(1);
              fetchSearchResults(1, keyword);
            }}
          />

          <div className="recent">
            <p className="recent-section">
              {mode === "favorite"
                ? `최근 선택된 기업 (${recentCompanies.length})`
                : `선택한 비교 기업 (${localCompareIds.length}/5)`}
            </p>

            {recentCompanies.map((company) => (
              <div key={company.id} className="company-item">
                <div className="company-left">
                  <img
                    src={company.logo || "/default.png"}
                    alt={company.name}
                  />
                  <div className="company-text">
                    <p className="company-name">{company.name}</p>
                    <span className="company-category">
                      {company.category ?? company.categoryName}
                    </span>
                  </div>
                </div>

                <button
                  className={`select-btn ${
                    isCompanySelected(company.id) ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(company)}
                >
                  {isCompanySelected(company.id) ? "선택 해제" : "선택하기"}
                </button>
              </div>
            ))}
          </div>

          {searchResults.length > 0 && (
            <div className="search">
              <p className="search-result">
                검색 결과 ({searchResults.length})
              </p>

              {searchResults.map((company) => (
                <div key={company.id} className="company-item">
                  <div className="company-left">
                    <img src={company.logo} alt={company.name} />
                    <div className="company-text">
                      <p className="company-name">{company.name}</p>
                      <span className="company-category">
                        {company.category}
                      </span>
                    </div>
                  </div>

                  <button
                    className={`select-btn ${
                      isCompanySelected(company.id) ? "selected" : ""
                    }`}
                    onClick={() => handleSelect(company)}
                  >
                    {isCompanySelected(company.id) ? "선택 해제" : "선택하기"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {searchResults.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      <AlertModal
        isOpen={alertOpen}
        message={alertMessage}
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
};

export default SelectCompanyModal;

import { useEffect, useState } from "react";
import "../../styles/pagination.css"
import "./SelectCompanyModal.css";
import SearchBar from "../search/SearchBar";
import Pagination from "../pagination/Pagination";


const USER_ID = 1;

const SelectCompanyModal = ({ onClose, onSelect }) => {
  const [recentCompanies, setRecentCompanies] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRecentCompanies();
  }, []);

  const fetchRecentCompanies = async () => {
    try {
      const res = await fetch(`/users/${USER_ID}/favorites`);
      if (!res.ok) throw new Error("조회 실패");

      const data = await res.json();

      const companies = data.companies || [];

      setRecentCompanies(companies);
      setSelectedIds(companies.map((c) => c.id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSearchResults = async (page = 1) => {
    try {
      const res = await fetch(
        `/companies?keyword=${keyword}&page=${page}`
      );

      if (!res.ok) throw new Error("검색 실패");

      const data = await res.json();

      const companies = data.data?.companies || data.companies || [];
      const total = data.data?.totalPages || data.totalPages || 1;

      setSearchResults(companies);
      setTotalPages(total);

    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = async (company) => {
    const isSelected = selectedIds.includes(company.id);

    try {
      if (isSelected) {
        await fetch(
          `/users/${USER_ID}/favorites/${company.id}`,
          {
            method: "DELETE",
          }
        );

        setSelectedIds((prev) =>
          prev.filter((id) => id !== company.id)
        );
      } else {
        await fetch(`/users/${USER_ID}/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyId: company.id }),
        });

        setSelectedIds((prev) => [...prev, company.id]);
      }

      onSelect?.(company);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchSearchResults(page);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>나의 기업 선택하기</h2>

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
            fetchSearchResults(1);
          }}
        />

        <div className="recent">
          <p className="recent-section">
            최근 선택된 기업 ({recentCompanies.length})
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
                    {company.categoryName}
                  </span>
                </div>
              </div>

              <button
                className={`select-btn ${selectedIds.includes(company.id) ? "selected" : ""
                  }`}
                onClick={() => handleSelect(company)}
              >
                {selectedIds.includes(company.id) ? "선택 해제" : "선택하기"}
              </button>
            </div>
          ))}
        </div>

        {searchResults.length > 0 && (
          <div className="search">
            <p className="search-result">검색 결과 ({searchResults.length})</p>

            {searchResults.map((company) => (
              <div key={company.id} className="company-item">
                <div className="company-left">
                  <img src={company.logo} alt={company.name} />
                  <div className="company-text">
                    <p className="company-name">{company.name}</p>
                    <span className="company-category">
                      {company.categoryName}
                    </span>
                  </div>
                </div>

                <button
                  className={`select-btn ${selectedIds.includes(company.id) ? "selected" : ""
                    }`}
                  onClick={() => handleSelect(company)}
                >
                  {selectedIds.includes(company.id) ? "선택 해제" : "선택하기"}
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
  );
};

export default SelectCompanyModal;
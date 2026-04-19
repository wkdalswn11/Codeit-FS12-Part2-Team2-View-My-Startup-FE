import { useEffect, useState } from "react";
import "./SelectCompanyModal.css";

const USER_ID = 1;

const SelectCompanyModal = ({ onClose, onSelect }) => {
  const [recentCompanies, setRecentCompanies] = useState([]);

  useEffect(() => {
    fetchRecentCompanies();
  }, []);

  const fetchRecentCompanies = async () => {
    try {
      const res = await fetch(`/users/${USER_ID}/favorites`);

      if (!res.ok) throw new Error("조회 실패");

      const data = await res.json();

      // 백엔드 구조에 따라 둘 중 하나 사용 - 현재 비활성화 확인 후 변경 예정
      // setRecentCompanies(data.companies || data.data?.companies || []);
      setRecentCompanies(data.companies);
    } catch (err) {
      console.error("기업 불러오기 실패", err);
    }
  };

  const handleSelect = async (company) => {
    try {
      await fetch(`/users/${USER_ID}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyId: company.id }),
      });

      onSelect(company);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>나의 기업 선택하기</h2>

          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

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
                className="select-btn"
                onClick={() => handleSelect(company)}
              >
                선택하기
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectCompanyModal;
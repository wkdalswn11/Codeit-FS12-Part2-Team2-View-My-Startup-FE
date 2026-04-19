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
      setRecentCompanies(data.companies);
    } catch (err) {
      console.error(err);
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
          <h2 >나의 기업 선택하기</h2>

          <button className="modal-close" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16.3778 18.0541L11.2429 23.189C10.9519 23.48 10.6096 23.6255 10.2159 23.6255C9.8222 23.6255 9.47987 23.48 9.18889 23.189C8.89791 22.898 8.75242 22.5557 8.75242 22.162C8.75242 21.7684 8.89791 21.426 9.18889 21.135L14.3238 16.0001L9.18889 10.8652C8.89791 10.5742 8.75242 10.2319 8.75242 9.83822C8.75242 9.44454 8.89791 9.10221 9.18889 8.81123C9.47987 8.52025 9.8222 8.37476 10.2159 8.37476C10.6096 8.37476 10.9519 8.52025 11.2429 8.81123L16.3778 13.9462L21.5127 8.81123C21.8037 8.52025 22.146 8.37476 22.5397 8.37476C22.9334 8.37476 23.2757 8.52025 23.5667 8.81123C23.8576 9.10221 24.0031 9.44454 24.0031 9.83822C24.0031 10.2319 23.8576 10.5742 23.5667 10.8652L18.4317 16.0001L23.5667 21.135C23.8576 21.426 24.0031 21.7684 24.0031 22.162C24.0031 22.5557 23.8576 22.898 23.5667 23.189C23.2757 23.48 22.9334 23.6255 22.5397 23.6255C22.146 23.6255 21.8037 23.48 21.5127 23.189L16.3778 18.0541Z" fill="white" />
            </svg>
          </button>
        </div>

        <div className="search-box">

          <span className="search-search">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
              <path d="M6.89655 12.2605C8.37803 12.2605 9.6424 11.7401 10.6897 10.6992C11.7369 9.65837 12.2605 8.3908 12.2605 6.89655C12.2605 5.41507 11.7369 4.1507 10.6897 3.10345C9.6424 2.05619 8.37803 1.53257 6.89655 1.53257C5.4023 1.53257 4.13474 2.05619 3.09387 3.10345C2.053 4.1507 1.53257 5.41507 1.53257 6.89655C1.53257 8.3908 2.053 9.65837 3.09387 10.6992C4.13474 11.7401 5.4023 12.2605 6.89655 12.2605ZM6.89655 13.7931C5.9387 13.7931 5.04151 13.6111 4.20498 13.2471C3.36845 12.8831 2.64049 12.3914 2.02107 11.772C1.40166 11.1526 0.909962 10.4246 0.545977 9.58812C0.181992 8.7516 0 7.85441 0 6.89655C0 5.95147 0.181992 5.06066 0.545977 4.22414C0.909962 3.38761 1.40166 2.65645 2.02107 2.03065C2.64049 1.40485 3.36845 0.909962 4.20498 0.545977C5.04151 0.181992 5.9387 0 6.89655 0C7.84164 0 8.73244 0.181992 9.56897 0.545977C10.4055 0.909962 11.1367 1.40485 11.7625 2.03065C12.3883 2.65645 12.8831 3.38761 13.2471 4.22414C13.6111 5.06066 13.7931 5.95147 13.7931 6.89655C13.7931 7.71392 13.659 8.48659 13.3908 9.21456C13.1226 9.94253 12.7522 10.6066 12.2797 11.2069L14.7893 13.7165C14.9425 13.8697 15.016 14.0485 15.0096 14.2529C15.0032 14.4572 14.9234 14.636 14.7701 14.7893C14.6169 14.9298 14.4381 15 14.2337 15C14.0294 15 13.8506 14.9298 13.6973 14.7893L11.1877 12.2989C10.5875 12.7714 9.92337 13.1386 9.1954 13.4004C8.46743 13.6622 7.70115 13.7931 6.89655 13.7931Z" fill="white" />
            </svg>
          </span>

          <input placeholder="검색어를 입력해주세요" />

        </div>

        <div className="recent">
          <p className="recent-section">최근 선택된 기업 ({recentCompanies.length})</p>

          {recentCompanies.map((company) => (
            <div key={company.id} className="company-item">

              <div className="company-left">
                <img src={company.logo || "/default.png"} alt={company.name} />

                <div className="company-text">
                  <p className="company-name">{company.name}</p>
                  <span className="company-category">
                    {company.categoryName}
                  </span>
                </div>
              </div>

              <button
                className="select-btn"
                onClick={() => onSelect(company)}
              >
                선택하기
              </button>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default SelectCompanyModal;
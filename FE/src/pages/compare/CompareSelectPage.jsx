import { useEffect, useState } from "react";
import "./CompareSelectPage.css";

const USER_ID = 1;

const SelectCompanyModal = ({ onClose, onSelect }) => {
  const [recentCompanies, setRecentCompanies] = useState([]);

  useEffect(() => {
    fetchRecentCompanies();
  }, []);

  // 🔥 추가
  const fetchRecentCompanies = async () => {
    try {
      const res = await fetch(`/users/${USER_ID}/favorites`);

      if (!res.ok) throw new Error("조회 실패");

      const data = await res.json();
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
    <>
      <Header />
      <div className="page">
        <div className="container">
          <h2 className="title">나의 기업을 선택해 주세요!</h2>

          {!myCompany && (
            <>
              <div className="card" onClick={() => setIsModalOpen(true)}>
                <div className="plus">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M14.7143 17.619H7.45238C7.04087 17.619 6.69593 17.4798 6.41756 17.2014C6.13919 16.9231 6 16.5781 6 16.1666C6 15.7551 6.13919 15.4102 6.41756 15.1318C6.69593 14.8534 7.04087 14.7143 7.45238 14.7143H14.7143V7.45238C14.7143 7.04087 14.8534 6.69593 15.1318 6.41756C15.4102 6.13919 15.7551 6 16.1666 6C16.5781 6 16.9231 6.13919 17.2014 6.41756C17.4798 6.69593 17.619 7.04087 17.619 7.45238V14.7143H24.8809C25.2924 14.7143 25.6373 14.8534 25.9157 15.1318C26.1941 15.4102 26.3333 15.7551 26.3333 16.1666C26.3333 16.5781 26.1941 16.9231 25.9157 17.2014C25.6373 17.4798 25.2924 17.619 24.8809 17.619H17.619V24.8809C17.619 25.2924 17.4798 25.6373 17.2014 25.9157C16.9231 26.1941 16.5781 26.3333 16.1666 26.3333C15.7551 26.3333 15.4102 26.1941 15.1318 25.9157C14.8534 25.6373 14.7143 25.2924 14.7143 24.8809V17.619Z" fill="#212121" />
                  </svg>
                </div>
                <p>기업 추가</p>
              </div>
              <button className="compareBtn" disabled>
                기업 비교하기
              </button>
            </>
          )}

          {myCompany && (
            <>
              <div className="card">
                <button className="resetBtn" onClick={handleReset}>
                  선택 취소
                </button>

                <div className="companyCircle">
                  {myCompany.name.charAt(0)}
                </div>

                <p>{myCompany.name}</p>
                <span>{myCompany.categoryName}</span>
              </div>

              <div className="compareSection">
                <div className="compareHeader">
                  <h3>어떤 기업이 궁금하세요?</h3>
                  <button className="addBtn">기업 추가하기</button>
                </div>

                <div className="emptyBox">
                  아직 추가한 기업이 없어요,
                  <br />
                  버튼을 눌러 기업을 추가해보세요!
                </div>
              </div>

              <button className="compareBtn">
                기업 비교하기
              </button>
            </>
          )}

          {isModalOpen && (
            <SelectCompanyModal
              onClose={() => setIsModalOpen(false)}
              onSelect={handleSelectCompany}
            />
          )}
        </div >
      </div >
    </>
  );
};

export default CompareSelectPage;
import { useState } from "react";
import "./CompareSelectPage.css";
import Header from "../../components/layout/header";
import SelectCompanyModal from "../../components/modal/SelectCompanyModal";

const USER_ID = 1;

const CompareSelectPage = () => {
  const [myCompany, setMyCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectCompany = (company) => {
    setMyCompany(company);
    setIsModalOpen(false);
  };

  const handleReset = async () => {
    try {
      await fetch(`/users/${USER_ID}/favorites/${myCompany.id}`, {
        method: "DELETE",
      });

      setMyCompany(null);
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

          {/* 선택 전 */}
          {!myCompany && (
            <>
              <div className="card" onClick={() => setIsModalOpen(true)}>
                <div className="plus">+</div>
                <p>기업 추가</p>
              </div>

              <button className="compareBtn" disabled>
                기업 비교하기
              </button>
            </>
          )}

          {/* 선택 후 */}
          {myCompany && (
            <>
              <div className="card">
                <button className="resetBtn" onClick={handleReset}>
                  선택 취소
                </button>

                <div className="companyCircle">{myCompany.name.charAt(0)}</div>

                <p>{myCompany.name}</p>
                <span>{myCompany.categoryName}</span>
              </div>

              <div className="compareSection">
                <div className="compareHeader">
                  <h3>어떤 기업이 궁금하세요?</h3>
                  <button
                    className="addBtn"
                    onClick={() => setIsModalOpen(true)}
                  >
                    기업 추가하기
                  </button>
                </div>

                <div className="emptyBox">
                  아직 추가한 기업이 없어요,
                  <br />
                  버튼을 눌러 기업을 추가해보세요!
                </div>
              </div>

              <button className="compareBtn">기업 비교하기</button>
            </>
          )}

          {/* 모달 */}
          {isModalOpen && (
            <SelectCompanyModal
              onClose={() => setIsModalOpen(false)}
              onSelect={handleSelectCompany}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CompareSelectPage;

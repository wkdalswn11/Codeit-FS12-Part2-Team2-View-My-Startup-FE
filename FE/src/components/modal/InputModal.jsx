import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InputModal.css";

const InputModal = ({ onClose, company, user, onSubmit, submitting }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const handleSubmit = () => {
    // 1. 유효성 검사 (입력 안 했으면 차단)
    if (!amount || !comment) {
      alert("투자 금액과 코멘트를 입력해 주세요.");
      return;
    }

    // 2. 부모(Result.jsx)에서 넘겨받은 onSubmit 함수에 값만 전달
    // 여기서 실제 API 호출(createCompanyInvestment)이 실행됩니다.
    onSubmit({ amount, comment });
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="form-title">기업에 투자하기</h2>
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

        <div className="company-info">
          <img
            src={company?.logo || "/default-company.png"}
            alt="logo"
            className="logo-img"
          />
          <div className="company-title">
            <div className="company-name">{company?.name}</div>
            <div className="company-desc">
              {company?.categoryName || company?.category}
            </div>
          </div>
        </div>

        <div className="form">
          <p className="form-text">투자자 이름</p>
          <input
            value={user?.name || ""}
            readOnly
            className="form-input InputModal-read-only-input"
          />

          <p className="form-text">투자 금액</p>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="투자 금액을 입력해 주세요"
            className="form-input"
          />

          <p className="form-text">투자 코멘트</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="투자에 대한 코멘트를 입력해 주세요"
            className="form-textarea"
          />
        </div>

        <div className="modal-footer">
          <button className="cancel" onClick={onClose} disabled={submitting}>
            취소
          </button>
          <button
            className="submit"
            onClick={handleSubmit}
            disabled={submitting}
          >
            투자하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;

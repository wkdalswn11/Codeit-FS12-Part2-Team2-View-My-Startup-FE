import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const maxPageCount = 5;

  // 시작페이지
  const start = Math.max(
    Math.min(currentPage - 2, totalPages - maxPageCount + 1),
    1,
  );

  // 마지막 페이지
  const end = Math.min(start + maxPageCount - 1, totalPages);

  // 페이지 배열 생성
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const prevClickHandel = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextClickHandle = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageClickHandle = (page) => {
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <button
        onClick={prevClickHandel}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        {"<"}
      </button>
      {pages.map((page) => {
        return (
          <button
            key={page}
            onClick={() => pageClickHandle(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={nextClickHandle}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;

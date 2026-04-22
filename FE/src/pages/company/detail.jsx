import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/companyDetail.css";
import Button from "../../components/ui/Button";
import SearchBar from "../../components/search/SearchBar";
import Pagination from "../../components/pagination/Pagination";
import DetailSkeleton from "../../components/ui/DetailSkeleton";
import ProtectedDetailLayout from "../../components/layout/ProtectedDetailLayout";
import { getStoredUser } from "../auth/Auth";
import {
  getCompanyDetail,
  getCompanyInvestments,
  createCompanyInvestment,
  updateCompanyInvestment,
  deleteCompanyInvestment,
} from "../../services/companyApi";
import useDebounce from "../../hook/useDebounce";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [companyDetail, setCompanyDetail] = useState({});
  const [investmentList, setInvestmentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [investmentSearch, setInvestmentSearch] = useState("");
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  const [investForm, setInvestForm] = useState({
    amount: "",
    comment: "",
  });
  const [editForm, setEditForm] = useState({
    userName: "",
    amount: "",
    comment: "",
  });
  const [meta, setMeta] = useState({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 1,
  });

  const { id } = useParams();
  const user = getStoredUser();
  const userId = user?.id;
  const debouncedInvestmentSearch = useDebounce(investmentSearch, 500);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [companyData, investmentData] = await Promise.all([
        getCompanyDetail(id),
        getCompanyInvestments({
          id,
          page: currentPage,
          limit: 10,
          keyword: debouncedInvestmentSearch,
        }),
      ]);

      setCompanyDetail(companyData.data || {});
      setInvestmentList(investmentData.data || []);
      setMeta(
        investmentData.meta || {
          page: 1,
          limit: 5,
          total: 0,
          totalPages: 1,
        },
      );
    } catch (err) {
      console.error(err);
      alert("데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, id, debouncedInvestmentSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedInvestmentSearch]);

  const isMyInvestment = (item) => {
    if (!user) return false;

    return item.userName === user.name || item.userEmail === user.email;
  };

  const handleEditClick = (item) => {
    setSelectedInvestment(item);
    setEditForm({
      userName: item.userName || "",
      amount: item.amount || "",
      comment: item.comment || "",
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInvestFormChange = (e) => {
    const { name, value } = e.target;

    setInvestForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateInvestment = async (e) => {
    e.preventDefault();
    if (!selectedInvestment) return;

    if (!userId) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    if (!editForm.amount || Number(editForm.amount) <= 0) {
      alert("투자 금액을 입력해주세요.");
      return;
    }

    try {
      setSubmitting(true);

      await updateCompanyInvestment({
        userId,
        investmentId: selectedInvestment.id,
        data: {
          amount: Number(editForm.amount),
          comment: editForm.comment,
        },
      });

      setSelectedInvestment(null);
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("수정에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateInvestment = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    if (!investForm.amount || Number(investForm.amount) <= 0) {
      alert("투자 금액을 입력해주세요.");
      return;
    }

    try {
      setSubmitting(true);

      await createCompanyInvestment({
        companyId: id,
        data: {
          userId,
          amount: Number(investForm.amount),
          comment: investForm.comment,
        },
      });

      setIsInvestModalOpen(false);
      setInvestForm({
        amount: "",
        comment: "",
      });
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("투자에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteInvestment = async () => {
    if (!deleteTarget) return;

    if (!userId) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    try {
      setSubmitting(true);

      setInvestmentList((prev) =>
        prev.filter((investment) => investment.id !== deleteTarget.id),
      );
      await deleteCompanyInvestment({
        userId,
        investmentId: deleteTarget.id,
      });

      setDeleteTarget(null);
      setIsDeleteConfirmOpen(false);
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("삭제에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedDetailLayout>
      {loading ? (
        <DetailSkeleton />
      ) : (
        <>
          <section className="detail-header">
            <img
              src={companyDetail.logo || "https://placehold.co/50"}
              alt={companyDetail.name}
              className="detail-logo"
            />
            <div className="detail-header-info">
              <h1 className="detail-title">{companyDetail.name}</h1>
              <p className="detail-category">{companyDetail.category}</p>
            </div>
          </section>

          <section className="detail-summary">
            <div className="detail-card">
              <span className="detail-card-label">누적 투자 금액</span>
              <strong className="detail-card-value">
                {companyDetail?.baseInvestment?.toLocaleString() ?? 0} 원
              </strong>
            </div>

            <div className="detail-card">
              <span className="detail-card-label">매출액</span>
              <strong className="detail-card-value">
                {companyDetail?.revenue?.toLocaleString() ?? 0} 원
              </strong>
            </div>

            <div className="detail-card">
              <span className="detail-card-label">고용 인원</span>
              <strong className="detail-card-value">
                {companyDetail?.employeeCount ?? 0} 명
              </strong>
            </div>
          </section>

          <section className="detail-description">
            <h2 className="detail-section-title">기업 소개</h2>
            <p className="detail-description-text">
              {companyDetail.description}
            </p>
          </section>

          <section className="detail-investment">
            <div className="detail-investment-header">
              <h2 className="detail-section-title">
                View My Startup에서 받은 투자
              </h2>
              <Button
                type="Button-large"
                variant="Button-primary"
                onClick={() => setIsInvestModalOpen(true)}
              >
                기업 투자하기
              </Button>
            </div>

            <div className="detail-investment-controls">
              <SearchBar
                value={investmentSearch}
                onChange={setInvestmentSearch}
                onSubmit={() => setCurrentPage(1)}
              />
            </div>

            <h3 className="detail-investment-total">
              총 {companyDetail?.siteInvestment?.toLocaleString() ?? 0} 원
            </h3>

            <div className="detail-table-header">
              <span>투자자 이름</span>
              <span>순위</span>
              <span>투자 금액</span>
              <span>투자 코멘트</span>
              <span>관리</span>
            </div>

            <div className="detail-investment-list">
              {!investmentList?.length ? (
                <div className="empty-investment">투자 내역이 없습니다.</div>
              ) : (
                investmentList.map((item) => (
                  <div key={item.id} className="detail-investment-item">
                    <span className="detail-investor-name">
                      {item.userName}
                    </span>
                    <span className="detail-invest-rank">{item.rank}위</span>
                    <span className="detail-invest-amount">
                      {item?.amount?.toLocaleString() ?? 0}원
                    </span>
                    <span className="detail-invest-comment">
                      {item.comment}
                    </span>
                    <div className="detail-invest-actions">
                      {isMyInvestment(item) && (
                        <>
                          <button
                            type="button"
                            className="detail-action-button detail-action-edit"
                            onClick={() => handleEditClick(item)}
                            disabled={submitting}
                          >
                            수정
                          </button>
                          <button
                            type="button"
                            className="detail-action-button detail-action-delete"
                            onClick={() => {
                              setDeleteTarget(item);
                              setIsDeleteConfirmOpen(true);
                            }}
                            disabled={submitting}
                          >
                            삭제
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <Pagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            onPageChange={setCurrentPage}
          />

          {isInvestModalOpen && (
            <div className="detail-edit-modal-backdrop">
              <form
                className="detail-edit-modal"
                onSubmit={handleCreateInvestment}
              >
                <div className="detail-edit-modal-header">
                  <h3>기업 투자하기</h3>
                  <button
                    type="button"
                    className="detail-edit-close-button"
                    onClick={() => setIsInvestModalOpen(false)}
                  >
                    x
                  </button>
                </div>

                <div className="detail-modal-company-info">
                  <img
                    src={companyDetail.logo || "https://placehold.co/50"}
                    alt={companyDetail.name}
                    className="detail-modal-company-logo"
                  />
                  <div className="detail-modal-company-title">
                    <div className="detail-modal-company-name">
                      {companyDetail.name}
                    </div>
                    <div className="detail-modal-company-category">
                      {companyDetail.category}
                    </div>
                  </div>
                </div>

                <label className="detail-edit-label">
                  투자 금액
                  <input
                    name="amount"
                    type="number"
                    min="1"
                    value={investForm.amount}
                    onChange={handleInvestFormChange}
                    className="detail-edit-input"
                  />
                </label>

                <label className="detail-edit-label">
                  투자 코멘트
                  <textarea
                    name="comment"
                    value={investForm.comment}
                    onChange={handleInvestFormChange}
                    className="detail-edit-textarea"
                  />
                </label>

                <div className="detail-edit-modal-footer">
                  <button
                    type="button"
                    className="detail-edit-cancel-button"
                    onClick={() => setIsInvestModalOpen(false)}
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="detail-edit-submit-button"
                    disabled={submitting}
                  >
                    투자하기
                  </button>
                </div>
              </form>
            </div>
          )}
          {isDeleteConfirmOpen && (
            <div className="detail-edit-modal-backdrop">
              <div className="detail-confirm-modal">
                <h3 className="detail-confirm-title">정말 삭제하시겠습니까?</h3>

                <div className="detail-confirm-actions">
                  <button
                    type="button"
                    className="detail-confirm-cancel-button"
                    onClick={() => {
                      setIsDeleteConfirmOpen(false);
                      setDeleteTarget(null);
                    }}
                  >
                    아니오
                  </button>
                  <button
                    type="button"
                    className="detail-confirm-delete-button"
                    onClick={handleDeleteInvestment}
                    disabled={submitting}
                  >
                    네
                  </button>
                </div>
              </div>
            </div>
          )}
          {selectedInvestment && (
            <div className="detail-edit-modal-backdrop">
              <form
                className="detail-edit-modal"
                onSubmit={handleUpdateInvestment}
              >
                <div className="detail-edit-modal-header">
                  <h3>투자 수정하기</h3>
                  <button
                    type="button"
                    className="detail-edit-close-button"
                    onClick={() => setSelectedInvestment(null)}
                  >
                    x
                  </button>
                </div>

                <label className="detail-edit-label">
                  투자자 이름
                  <input
                    name="userName"
                    value={editForm.userName}
                    className="detail-edit-input"
                    disabled
                  />
                </label>

                <label className="detail-edit-label">
                  투자 금액
                  <input
                    name="amount"
                    type="number"
                    min="1"
                    value={editForm.amount}
                    onChange={handleEditFormChange}
                    className="detail-edit-input"
                  />
                </label>

                <label className="detail-edit-label">
                  투자 코멘트
                  <textarea
                    name="comment"
                    value={editForm.comment}
                    onChange={handleEditFormChange}
                    className="detail-edit-textarea"
                  />
                </label>

                <div className="detail-edit-modal-footer">
                  <button
                    type="button"
                    className="detail-edit-cancel-button"
                    onClick={() => setSelectedInvestment(null)}
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="detail-edit-submit-button"
                    disabled={submitting}
                  >
                    수정 완료
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </ProtectedDetailLayout>
  );
};

export default Detail;

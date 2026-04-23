import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/companyDetail.css";
import "../../styles/table.css";
import Button from "../../components/ui/Button";
import SearchBar from "../../components/search/SearchBar";
import Pagination from "../../components/pagination/Pagination";
import DetailSkeleton from "../../components/ui/DetailSkeleton";
import ProtectedDetailLayout from "../../components/layout/ProtectedDetailLayout";
import { getCompanyDetail } from "../../services/companyApi";
import useDebounce from "../../hook/useDebounce";
import useUserStore from "../../store/userStore";
import FormField from "../../components/ui/FormField";
import {
  createCompanyInvestment,
  deleteCompanyInvestment,
  getCompanyInvestments,
  updateCompanyInvestment,
} from "../../services/investmentApi";
import AlertModal from "../../components/modal/AlertModal";

const Detail = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
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
  const user = useUserStore((state) => state.user);
  const USER_ID = user?.id;

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
      setAlertMessage("데이터를 불러오지 못했습니다.");
      setAlertOpen(true);
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

  const hasMyInvestment = investmentList.some((item) => isMyInvestment(item));

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

    if (!USER_ID) {
      setAlertMessage("로그인 정보가 없습니다.");
      setAlertOpen(true);
      return;
    }

    if (!editForm.amount || Number(editForm.amount) <= 0) {
      setAlertMessage("투자 금액을 입력해주세요.");
      setAlertOpen(true);
      return;
    }

    try {
      setSubmitting(true);

      await updateCompanyInvestment({
        userId: USER_ID,
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
      setAlertMessage("수정에 실패했습니다.");
      setAlertOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateInvestment = async (e) => {
    e.preventDefault();

    if (!USER_ID) {
      setAlertMessage("로그인 정보가 없습니다.");
      setAlertOpen(true);
      return;
    }

    if (!investForm.amount || Number(investForm.amount) <= 0) {
      setAlertMessage("투자 금액을 입력해주세요.");
      setAlertOpen(true);
      return;
    }

    try {
      setSubmitting(true);

      await createCompanyInvestment({
        companyId: id,
        data: {
          userId: USER_ID,
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
      setAlertMessage("투자에 실패했습니다.");
      setAlertOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteInvestment = async () => {
    if (!deleteTarget) return;

    if (!USER_ID) {
      setAlertMessage("로그인 정보가 없습니다.");
      setAlertOpen(true);
      return;
    }

    try {
      setSubmitting(true);

      setInvestmentList((prev) =>
        prev.filter((investment) => investment.id !== deleteTarget.id),
      );
      await deleteCompanyInvestment({
        userId: USER_ID,
        investmentId: deleteTarget.id,
      });

      setDeleteTarget(null);
      setIsDeleteConfirmOpen(false);
      await fetchData();
    } catch (err) {
      console.error(err);
      setAlertMessage("삭제에 실패했습니다.");
      setAlertOpen(true);
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
                disabled={hasMyInvestment}
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

            <div className="startup-table-wrap">
              <table className="startup-table mb-4">
                <thead className="startup-table-head">
                  <tr>
                    <th>투자자 이름</th>
                    <th>순위</th>
                    <th>투자 금액</th>
                    <th>투자 코멘트</th>
                    <th>관리</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="startup-table-dummy"></tr>
                </tbody>

                <tbody className="startup-table-body">
                  {!investmentList?.length ? (
                    <tr>
                      <td colSpan="5">투자 내역이 없습니다.</td>
                    </tr>
                  ) : (
                    investmentList.map((item) => (
                      <tr key={item.id} className="startup-table-row">
                        <td>{item.userName}</td>

                        <td>{item.rank}위</td>

                        <td>{item?.amount?.toLocaleString() ?? 0}원</td>

                        <td className="startup-invest-comment">
                          {item.comment}
                        </td>

                        <td>
                          <div className="detail-invest-actions">
                            {isMyInvestment(item) && (
                              <>
                                <Button
                                  type="Button-small"
                                  variant="Button-outline-orange"
                                  className="detail-action-button detail-action-edit"
                                  onClick={() => handleEditClick(item)}
                                  disabled={submitting}
                                >
                                  수정
                                </Button>

                                <Button
                                  type="Button-small"
                                  variant="Button-outline-gray"
                                  className="detail-action-button detail-action-delete"
                                  onClick={() => {
                                    setDeleteTarget(item);
                                    setIsDeleteConfirmOpen(true);
                                  }}
                                  disabled={submitting}
                                >
                                  삭제
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
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
                    disabled={submitting}
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

                <FormField
                  label="투자 금액"
                  name="amount"
                  type="number"
                  value={investForm.amount}
                  onChange={handleInvestFormChange}
                  disabled={submitting}
                />

                <FormField
                  label="투자 코멘트"
                  name="comment"
                  value={investForm.comment}
                  onChange={handleInvestFormChange}
                  textarea
                  disabled={submitting}
                />

                <div className="detail-edit-modal-footer">
                  <Button
                    type="Button-medium"
                    variant="Button-outline-orange"
                    className="detail-edit-cancel-button"
                    onClick={() => setIsInvestModalOpen(false)}
                    htmlType="button"
                    disabled={submitting}
                  >
                    취소
                  </Button>

                  <Button
                    type="Button-medium"
                    variant="Button-primary"
                    className="detail-edit-submit-button"
                    disabled={submitting}
                    htmlType="submit"
                  >
                    투자하기
                  </Button>
                </div>
              </form>
            </div>
          )}
          {isDeleteConfirmOpen && (
            <div className="detail-edit-modal-backdrop">
              <div className="detail-confirm-modal">
                <h3 className="detail-confirm-title">정말 삭제하시겠습니까?</h3>

                <div className="detail-confirm-actions">
                  <Button
                    type="Button-medium"
                    variant="Button-outline-orange"
                    className="detail-confirm-cancel-button"
                    onClick={() => {
                      setIsDeleteConfirmOpen(false);
                      setDeleteTarget(null);
                    }}
                    disabled={submitting}
                  >
                    아니오
                  </Button>

                  <Button
                    type="Button-medium"
                    variant="Button-primary"
                    className="detail-confirm-delete-button"
                    onClick={handleDeleteInvestment}
                    disabled={submitting}
                    htmlType="button"
                  >
                    네
                  </Button>
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
                    disabled={submitting}
                  >
                    x
                  </button>
                </div>

                <FormField
                  label="투자자 이름"
                  name="userName"
                  value={editForm.userName}
                  readOnly
                />

                <FormField
                  label="투자 금액"
                  name="amount"
                  type="number"
                  value={editForm.amount}
                  onChange={handleEditFormChange}
                  disabled={submitting}
                />

                <FormField
                  label="투자 코멘트"
                  name="comment"
                  value={editForm.comment}
                  onChange={handleEditFormChange}
                  textarea
                  disabled={submitting}
                />

                <div className="detail-edit-modal-footer">
                  <Button
                    type="Button-medium"
                    variant="Button-outline-orange"
                    className="detail-edit-cancel-button"
                    onClick={() => setSelectedInvestment(null)}
                    disabled={submitting}
                  >
                    취소
                  </Button>

                  <Button
                    type="Button-medium"
                    variant="Button-primary"
                    className="detail-edit-submit-button"
                    disabled={submitting}
                    htmlType="submit"
                  >
                    수정 완료
                  </Button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
      <AlertModal
        isOpen={alertOpen}
        message={alertMessage}
        onClose={() => {
          setAlertOpen(false);
          setAlertMessage("");
        }}
      />
    </ProtectedDetailLayout>
  );
};

export default Detail;

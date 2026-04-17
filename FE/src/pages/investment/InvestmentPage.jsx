import React, { useEffect, useState } from "react";
import List from "./list";
import Pagination from "../../components/pagination/Pagination";
import ListSkeleton from "../../components/ui/ListSkeleton";

const InvestmentPage = () => {
  const [loading, setLoading] = useState(true);
  const [investmentList, setInvestmentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:8080/companies?page=${currentPage}&limit=10`,
        );

        if (!res.ok) {
          throw new Error(`API 오류: ${res.status}`);
        }

        const result = await res.json();

        setInvestmentList(result.data || []);
        setMeta(result.meta || {});
      } catch (err) {
        console.error("데이터 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  if (loading) {
    return <ListSkeleton />;
  }

  return (
    <>
      <List investmentList={investmentList} />
      <Pagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default InvestmentPage;

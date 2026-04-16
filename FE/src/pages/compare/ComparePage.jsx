import React, { use, useEffect, useState } from "react";
import List from "./list";
import Pagination from "../../components/pagination/Pagination";
import "../../styles/pagination.css";
import ListSkeleton from "../../components/ui/ListSkeleton";

const CompanyPage = () => {
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState([]);
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
          throw new Error("데이터 요청 실패");
        }
        const result = await res.json();

        setCompareList(result.data || []);
        setMeta(result.meta || {});
      } catch (err) {
        console.error(err);
        setError(err.message);
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
      <List compareList={compareList} />
      <Pagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default CompanyPage;

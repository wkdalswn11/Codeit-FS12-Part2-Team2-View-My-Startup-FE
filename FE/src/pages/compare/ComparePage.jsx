import React, { use, useEffect, useState } from "react";
import List from "./list";
import Pagination from "../../components/pagination/Pagination";
import "../../styles/pagination.css";
import ListSkeleton from "../../components/ui/ListSkeleton";
import ProtectedLayout from "../../components/layout/ProtectedLayout";

const CompanyPage = () => {
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("favoriteCount_desc");
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
          `http://localhost:8080/companies?page=${currentPage}&limit=10&sort=${sort}`,
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
  }, [currentPage, sort]);

  return (
    <>
      <ProtectedLayout
        title="비교 현황"
        sortVariant="MY_SELECTION"
        onSortChange={setSort}
      >
        {loading ? (
          <ListSkeleton />
        ) : (
          <>
            <List compareList={compareList} />
            <Pagination
              currentPage={meta.page}
              totalPages={meta.totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </ProtectedLayout>
    </>
  );
};

export default CompanyPage;

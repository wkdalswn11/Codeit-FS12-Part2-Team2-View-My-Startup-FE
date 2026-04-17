import React, { useEffect, useState } from "react";
import List from "./list";
import Pagination from "../../components/pagination/Pagination";
import "../../styles/pagination.css";
import ListSkeleton from "../../components/ui/ListSkeleton";
import ProtectedLayout from "../../components/layout/ProtectedLayout";
import useDebounce from "../../hook/useDebounce";

const CompanyPage = () => {
  const [loading, setLoading] = useState(true);
  const [companyList, setCompanyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("investment_desc");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const handleSearchSubmit = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, sort]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:8080/companies?page=${currentPage}&limit=10&sort=${sort}&keyword=${debouncedSearch}`,
        );

        if (!res.ok) {
          throw new Error(`API 오류: ${res.status}`);
        }

        const result = await res.json();

        setCompanyList(result.data || []);
        setMeta(
          result.meta || {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1,
          },
        );
      } catch (err) {
        console.error("회사 목록 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, sort, debouncedSearch]);

  return (
    <ProtectedLayout
      title="전체 스타트업 목록"
      sortVariant="INVESTMENT"
      onSortChange={setSort}
      search={search}
      onSearchChange={setSearch}
      onSearchSubmit={handleSearchSubmit}
    >
      {loading ? (
        <ListSkeleton />
      ) : (
        <>
          <List companyList={companyList} />
          <Pagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </ProtectedLayout>
  );
};

export default CompanyPage;

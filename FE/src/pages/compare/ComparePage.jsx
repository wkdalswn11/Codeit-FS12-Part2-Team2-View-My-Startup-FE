import React, { useEffect, useState } from "react";
import List from "./list";
import Pagination from "../../components/pagination/Pagination";
import "../../styles/pagination.css";

const CompanyPage = () => {
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
      const res = await fetch(
        `http://localhost:8080/companies?page=${currentPage}&limit=10`,
      );
      const result = await res.json();

      setCompareList(result.data || []);
      setMeta(result.meta || {});
    };
    fetchData();
  }, [currentPage]);

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

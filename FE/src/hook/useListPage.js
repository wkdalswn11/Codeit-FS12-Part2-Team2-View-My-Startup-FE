import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { getCompanies } from "../services/companyApi";

function useCompanyList(initialSort) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState(initialSort);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
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
        setError(null);

        const result = await getCompanies({
          page: currentPage,
          limit: 10,
          sort,
          keyword: debouncedSearch,
        });

        setList(result.data || []);
        setMeta(
          result.meta || {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1,
          },
        );
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, sort, debouncedSearch]);

  return {
    loading,
    list,
    currentPage,
    setCurrentPage,
    sort,
    setSort,
    search,
    setSearch,
    meta,
    error,
    handleSearchSubmit,
  };
}

export default useCompanyList;

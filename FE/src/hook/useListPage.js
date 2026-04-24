import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { getCompanies } from "../services/companyApi";

function useCompanyList(initialSort, fetchApi = getCompanies) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState(initialSort);
  const [category, setCategory] = useState("");
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
  }, [debouncedSearch, sort, category]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchApi({
          page: currentPage,
          limit: 10,
          sort,
          keyword: debouncedSearch,
          category,
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
  }, [currentPage, sort, debouncedSearch, category, fetchApi]);

  return {
    loading,
    list,
    currentPage,
    setCurrentPage,
    category,
    setCategory,
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

import React from "react";
import ProtectedLayout from "../../components/layout/ProtectedLayout";
import ListSkeleton from "../../components/ui/ListSkeleton";
import useListPage from "../../hook/useListPage";
import TrendList from "./TrendList";
import Pagination from "../../components/pagination/Pagination";
import { getTrends } from "../../services/trendApi";

const TrendPage = () => {
  const {
    loading,
    list: companyList,
    meta,
    setCurrentPage,
    setSort,
    search,
    setSearch,
    handleSearchSubmit,
  } = useListPage("7days", getTrends);

  return (
    <ProtectedLayout
      title="트렌드 현황"
      sortVariant="TREND_SELECTION"
      onSortChange={setSort}
      search={search}
      onSearchChange={setSearch}
      onSearchSubmit={handleSearchSubmit}
      showSearch={false}
    >
      {loading ? (
        <ListSkeleton />
      ) : (
        <>
          <TrendList companyList={companyList} />
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

export default TrendPage;

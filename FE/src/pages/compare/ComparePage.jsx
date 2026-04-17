import React from "react";
import List from "./list";
import Pagination from "../../components/pagination/Pagination";
import "../../styles/pagination.css";
import ListSkeleton from "../../components/ui/ListSkeleton";
import ProtectedLayout from "../../components/layout/ProtectedLayout";
import useListPage from "../../hook/useListPage";

const ComparePage = () => {
  const {
    loading,
    list: compareList,
    meta,
    setCurrentPage,
    setSort,
    search,
    setSearch,
    handleSearchSubmit,
  } = useListPage("favoriteCount_desc");

  return (
    <ProtectedLayout
      title="비교 현황"
      sortVariant="MY_SELECTION"
      onSortChange={setSort}
      search={search}
      onSearchChange={setSearch}
      onSearchSubmit={handleSearchSubmit}
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
  );
};

export default ComparePage;

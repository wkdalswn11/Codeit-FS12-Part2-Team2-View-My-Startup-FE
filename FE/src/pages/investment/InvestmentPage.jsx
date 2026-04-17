import React from "react";
import List from "./list";
import Pagination from "../../components/pagination/Pagination";
import ListSkeleton from "../../components/ui/ListSkeleton";
import ProtectedLayout from "../../components/layout/ProtectedLayout";
import useListPage from "../../hook/useListPage";

const InvestmentPage = () => {
  const {
    loading,
    list: investmentList,
    meta,
    setCurrentPage,
    setSort,
    search,
    setSearch,
    handleSearchSubmit,
  } = useListPage("siteInvestment_desc");

  return (
    <ProtectedLayout
      title="투자 현황"
      sortVariant="VIEW_MY_STARTUP"
      onSortChange={setSort}
      search={search}
      onSearchChange={setSearch}
      onSearchSubmit={handleSearchSubmit}
    >
      {loading ? (
        <ListSkeleton />
      ) : (
        <>
          <List investmentList={investmentList} />
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

export default InvestmentPage;

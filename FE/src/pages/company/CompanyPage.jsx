import React from "react";
import List from "./list";
import Pagination from "../../components/pagination/Pagination";
import "../../styles/pagination.css";
import ListSkeleton from "../../components/ui/ListSkeleton";
import ProtectedLayout from "../../components/layout/ProtectedLayout";
import useCompanyList from "../../hook/useListPage";
import SelectedList from "../../components/search/SelectedList";

const CompanyPage = () => {
  const {
    loading,
    list: companyList,
    meta,
    setCurrentPage,
    setSort,
    category,
    setCategory,
    search,
    setSearch,
    handleSearchSubmit,
  } = useCompanyList("investment_desc");

  return (
    <ProtectedLayout
      title="전체 스타트업 목록"
      sortVariant="INVESTMENT"
      onSortChange={setSort}
      search={search}
      categoryElement={
        <SelectedList
          variant="CATEGORY"
          value={category}
          onSortChange={setCategory}
        />
      }
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

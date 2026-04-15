import { useState } from "react";
import "./App.css";
import InvestmentList from "./pages/investment/list";
import "./styles/table.css";
import Result from "./pages/compare/result";
import Header from "./components/layout/header";
import CompanyPage from "./pages/company/CompanyPage";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedLayout from "./components/layout/ProtextedLayout";
import Auth from "./pages/auth/Auth";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedLayout title="전체 스타트업 목록">
              <CompanyPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/investments"
          element={
            <ProtectedLayout title="투자 현황">
              <InvestmentList />
            </ProtectedLayout>
          }
        />
        <Route
          path="/compare"
          element={
            <ProtectedLayout title="비교 현황">
              <Result />
            </ProtectedLayout>
          }
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;

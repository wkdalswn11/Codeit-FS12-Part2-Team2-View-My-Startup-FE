import { useState } from "react";
import "./App.css";
import CompanyList from "./pages/company/list";
import InvestmentList from "./pages/investment/list";
import "./styles/table.css";
import Result from "./pages/compare/result";
import Header from "./components/layout/header";
import CompanyPage from "./pages/company/CompanyPage";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<CompanyPage />} />
        <Route path="/investments" element={<InvestmentList />} />
        <Route path="/compare" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;

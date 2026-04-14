import { useState } from "react";
import "./App.css";
import CompanyList from "./pages/company/list";
import InvestmentList from "./pages/investment/list";
import "./styles/table.css";
import Result from "./pages/compare/result";
import Header from "./components/layout/header";

function App() {
  return (
    <>
      <Header />
      <CompanyList />
      <InvestmentList />
      <Result />
    </>
  );
}

export default App;

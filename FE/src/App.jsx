import { useState } from "react";
import "./App.css";
import CompanyList from "./pages/company/list";
import InvestmentList from "./pages/investment/list";
import "./styles/table.css";
import Result from "./pages/compare/result";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CompanyList />
      <InvestmentList />
      <Result />
    </>
  );
}

export default App;

import "./App.css";
import "./styles/table.css";
import ComparePage from "./pages/compare/ComparePage";
import Header from "./components/layout/header";
import CompanyPage from "./pages/company/CompanyPage";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import InvestmentPage from "./pages/investment/InvestmentPage";
import Detail from "./pages/company/detail";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<CompanyPage />} />
        <Route path="/investments" element={<InvestmentPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/companies/:id" element={<Detail />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;

import "./App.css";
import "./styles/table.css";
import ComparePage from "./pages/compare/ComparePage";
import Header from "./components/layout/header";
import CompanyPage from "./pages/company/CompanyPage";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import InvestmentPage from "./pages/investment/InvestmentPage";
import Detail from "./pages/company/detail";
import CompareSelectPage from "./pages/compare/CompareSelectPage";
import Result from "./pages/compare/result";
import NotFound from "./pages/NotFound";
import TrendPage from "./pages/trend/TrendPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<CompanyPage />} />
        <Route path="/selectCompany/:id" element={<CompareSelectPage />} />
        <Route path="/companies/:id/result" element={<Result />} />
        <Route path="/compare/result" element={<Result />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/investments" element={<InvestmentPage />} />
        <Route path="/companies/:id" element={<Detail />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/trend" element={<TrendPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

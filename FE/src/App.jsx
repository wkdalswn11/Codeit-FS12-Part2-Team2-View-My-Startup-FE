// import { useState } from "react";
// import "./App.css";
// import InvestmentList from "./pages/investment/list";
// import "./styles/table.css";
// import Result from "./pages/compare/result";
// import Header from "./components/layout/header";
// import CompanyPage from "./pages/company/CompanyPage";
// import { Routes, Route, Navigate } from "react-router-dom";
// import ProtectedLayout from "./components/layout/ProtextedLayout";
// import Auth from "./pages/auth/Auth";

// function App() {
//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <ProtectedLayout title="전체 스타트업 목록">
//               <CompanyPage />
//             </ProtectedLayout>
//           }
//         />
//         <Route
//           path="/investments"
//           element={
//             <ProtectedLayout title="투자 현황">
//               <InvestmentList />
//             </ProtectedLayout>
//           }
//         />
//         <Route
//           path="/compare"
//           element={
//             <ProtectedLayout title="비교 현황">
//               <Result />
//             </ProtectedLayout>
//           }
//         />
//         <Route path="/auth" element={<Auth />} />
//       </Routes>
//     </>
//   );
// }

// export default App;


//------------------------------------------------------------------
//inputmodal
// import { useState } from "react";
// import InputModal from "./components/modal/InputModal";

// function App() {
//   const [open, setOpen] = useState(true);

//   const mockCompany = {
//     name: "코드잇",
//     categoryName: "에듀테크",
//     logo: "https://via.placeholder.com/40"
//   };

//   return (
//     <div>
//       <button onClick={() => setOpen(true)}>모달 열기</button>

//       {open && (
//         <InputModal
//           company={mockCompany}
//           onClose={() => setOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default App;

//selectcompanymodal
import { useState } from "react";
import SelectCompanyModal from "./components/modal/SelectCompanyModal";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        모달 열기
      </button>

      {isOpen && (
        <SelectCompanyModal onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}

export default App;
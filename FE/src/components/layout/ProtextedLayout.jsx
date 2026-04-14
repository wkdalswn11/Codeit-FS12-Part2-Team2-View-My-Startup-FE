import { Navigate } from "react-router-dom";
import Layout from "./layout";
import { getStoredUser } from "../../pages/auth/Auth";

const ProtectedLayout = ({ title, children }) => {
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Layout title={title}>{children}</Layout>;
};

export default ProtectedLayout;

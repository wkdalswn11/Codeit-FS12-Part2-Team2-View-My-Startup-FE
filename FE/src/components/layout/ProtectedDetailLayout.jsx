import { Navigate } from "react-router-dom";
import { getStoredUser } from "../../pages/auth/Auth";
import DetailLayout from "./DetailLayout";

const ProtectedDetailLayout = ({ children, ...rest }) => {
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <DetailLayout {...rest}>{children}</DetailLayout>;
};

export default ProtectedDetailLayout;

import { Navigate } from "react-router-dom";
import { getStoredUser } from "../../pages/auth/Auth";
import ListLayout from "./ListLayout";

const ProtectedLayout = ({ children, ...rest }) => {
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <ListLayout {...rest}>{children}</ListLayout>;
};

export default ProtectedLayout;

import { Navigate } from "react-router-dom";
import { getStoredUser } from "../../pages/auth/Auth";
import ListLayout from "./ListLayout";
import useUserStore from "../../store/userStore";

const ProtectedLayout = ({ children, ...rest }) => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <ListLayout {...rest}>{children}</ListLayout>;
};

export default ProtectedLayout;

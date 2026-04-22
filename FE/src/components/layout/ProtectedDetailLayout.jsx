import { Navigate } from "react-router-dom";
import { getStoredUser } from "../../pages/auth/Auth";
import DetailLayout from "./DetailLayout";
import useUserStore from "../../store/userStore";

const ProtectedDetailLayout = ({ children, ...rest }) => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <DetailLayout {...rest}>{children}</DetailLayout>;
};

export default ProtectedDetailLayout;

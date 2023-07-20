import { Navigate, Outlet } from "react-router-dom";
import { First } from "../first";
import { useAuthContext } from "../../contexts";

export const ProtectedAuth = () => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <First>
      <Outlet />
    </First>
  );
};

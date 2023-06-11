import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts";

export const ProtectedSchool = () => {
  const { userData, schoolData } = useAuthContext();
  const dash = userData?.dash;
  const dashSchool = schoolData?.dash;
  if (dash) {
    if (dash === "ADMIN" || dashSchool === "SCHOOL") return <Outlet />;
    return <Navigate replace to="/" />;
  }
  return <Navigate replace to="/" />;
};

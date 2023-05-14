import { Navigate, Route, Routes } from "react-router-dom";
import { First, Home, Login } from "../pages";
import { useAuthContext, useUserContext } from "../shared/contexts";

const AppRoutes = () => {
  const { isAuthenticated } = useAuthContext();
  const { userData } = useUserContext();
  if (isAuthenticated) {
    if (!userData?.is_first_access) {
      return (
        <Routes>
          <Route path="/first" element={<First />} />
          <Route path="*" element={<Navigate to="/first" />} />
        </Routes>
      );
    }
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;

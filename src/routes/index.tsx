import { Navigate, Route, Routes } from "react-router-dom";
import {
  ClassPage,
  Dashboard,
  First,
  Login,
  School,
  Student,
  User,
} from "../pages";
import { useAuthContext, useUserContext } from "../shared/contexts";

const AppRoutes = () => {
  const { isAuthenticated } = useAuthContext();
  const { userData, dashData } = useUserContext();
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
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/school" element={<School />} />
        {dashData && dashData === "SCHOOL" && (
          <>
            <Route path="/class" element={<ClassPage />} />
            <Route path="/student" element={<Student />} />
          </>
        )}
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

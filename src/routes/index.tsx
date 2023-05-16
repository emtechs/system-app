import { Navigate, Route, Routes } from "react-router-dom";
import {
  ClassPage,
  CreateFrequency,
  Dashboard,
  First,
  Frequency,
  ListFrequency,
  Login,
  School,
  Student,
  User,
} from "../pages";
import { useAuthContext } from "../shared/contexts";

const AppRoutes = () => {
  const { isAuthenticated, userData, dashData } = useAuthContext();

  if (isAuthenticated) {
    if (userData) {
      if (!userData.is_first_access) {
        return (
          <Routes>
            <Route path="/first" element={<First />} />
            <Route path="*" element={<Navigate to="/first" />} />
          </Routes>
        );
      }
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
        {dashData && dashData === "COMMON" && (
          <>
            <Route path="/frequency" element={<Frequency />} />
            <Route path="/frequency/create" element={<CreateFrequency />} />
            <Route path="/frequency/list" element={<ListFrequency />} />
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

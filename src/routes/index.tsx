import { Navigate, Route, Routes } from "react-router-dom";
import {
  ActiveUser,
  CreateAdm,
  CreateFrequency,
  CreateFrequencyAdm,
  CreateSchool,
  CreateServerPage,
  CreateStudent,
  CreateStudentAdm,
  Dashboard,
  DefineSecret,
  First,
  Frequency,
  ListFrequency,
  ListFrequencyAdm,
  ListSchool,
  ListUser,
  Login,
  RetrieveFrequency,
  School,
  Student,
  User,
} from "../pages";
import { useAuthContext } from "../shared/contexts";
import { CreateServerAdm } from "../pages/school/create/CreateServerAdm";
import { CreateClass } from "../pages/student/create/Class";
import { CreateClassAdm } from "../pages/student/create/ClassAdm";

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

    switch (dashData) {
      case "ADMIN":
        return (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/create" element={<CreateAdm back="/user" />} />
            <Route
              path="/user/define/secret"
              element={<DefineSecret back="/user" />}
            />
            <Route path="/user/list" element={<ListUser back="/user" />} />
            <Route path="/user/active" element={<ActiveUser back="/user" />} />
            <Route path="/school" element={<School />} />
            <Route
              path="/school/create"
              element={<CreateSchool back="/school" />}
            />
            <Route
              path="/school/create/server"
              element={<CreateServerAdm back="/school" />}
            />
            <Route
              path="/school/list"
              element={<ListSchool back="/school" />}
            />
            <Route path="/student" element={<Student />} />
            <Route
              path="/student/create"
              element={<CreateStudentAdm back="/student" />}
            />
            <Route
              path="/student/create/class"
              element={<CreateClassAdm back="/student" />}
            />
            <Route path="/frequency" element={<Frequency />} />
            <Route
              path="/frequency/create"
              element={<CreateFrequencyAdm back="/frequency" />}
            />
            <Route
              path="/frequency/retrieve"
              element={<RetrieveFrequency back="/frequency" />}
            />
            <Route
              path="/frequency/list"
              element={<ListFrequencyAdm back="/frequency" />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        );
      case "SCHOOL":
        return (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user" element={<CreateServerPage />} />
            <Route path="/class" element={<CreateClass />} />
            <Route path="/student" element={<CreateStudent />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        );
      case "COMMON":
        return (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/frequency/retrieve" element={<RetrieveFrequency />} />
            <Route path="/frequency/create" element={<CreateFrequency />} />
            <Route path="/frequency/list" element={<ListFrequency />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        );
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;

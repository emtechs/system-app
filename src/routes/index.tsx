import { Navigate, Route, Routes } from "react-router-dom";
import {
  HomePage,
  Login,
  RetrieveSchoolPage,
  SchoolPage,
  ViewSchoolPage,
} from "../pages";
import { ProtectedAuth } from "../shared/components";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedAuth />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/school" element={<SchoolPage />}>
          <Route path=":school_id" element={<RetrieveSchoolPage />}>
            <Route path=":view" element={<ViewSchoolPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

import { Navigate, Route, Routes } from "react-router-dom";
import {
  ClassPage,
  ClassYearPage,
  HomePage,
  Login,
  RetrieveClassPage,
  RetrieveSchoolPage,
  SchoolPage,
  ViewClassYearPage,
  ViewSchoolPage,
  YearPage,
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
        <Route path="/class" element={<ClassPage />}>
          <Route path=":class_id" element={<RetrieveClassPage />}>
            <Route path=":view" element={<ViewSchoolPage />} />
          </Route>
        </Route>
        <Route path="/year" element={<YearPage />}>
          <Route path=":year_id" element={<RetrieveClassPage />}>
            <Route path=":view" element={<ViewSchoolPage />} />
          </Route>
        </Route>
        <Route path="/year/class/:class_id" element={<ClassYearPage />}>
          <Route path=":view" element={<ViewClassYearPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  ClassPage,
  ClassYearPage,
  CreateFrequencyPage,
  CreateStudentAdmPage,
  DashboardSchoolPage,
  EditPasswordPage,
  EditProfilePage,
  FrequencyOpenPage,
  FrequencyPage,
  HomePage,
  ImportClassPage,
  ImportSchoolPage,
  ImportStudentPage,
  ListFrequencyPage,
  ListStudentFrequencyPage,
  ListStudentPage,
  PasswordPage,
  ReportPage,
  RetrieveClassPage,
  RetrieveFrequencyPage,
  RetrieveSchoolPage,
  RetrieveUserPage,
  SchoolPage,
  StudentFrequencyPage,
  UserPage,
} from "../pages";
import { ProtectedAdmin, ProtectedAuth } from "../shared/components";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/password/:userId/:token" element={<PasswordPage />} />
      <Route element={<ProtectedAuth />}>
        <Route element={<ProtectedAdmin />}>
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/:user_id" element={<RetrieveUserPage />} />
          <Route path="/student/list" element={<ListStudentPage />} />
          <Route
            path="/import/school"
            element={<ImportSchoolPage back="/school" />}
          />
          <Route
            path="/import/class"
            element={<ImportClassPage back="/class" />}
          />
          <Route
            path="/import/student"
            element={<ImportStudentPage back="/student" />}
          />
          <Route path="/school" element={<SchoolPage />} />
          <Route path="/school/:school_id" element={<RetrieveSchoolPage />} />
          <Route path="/home/school" element={<HomePage isHome />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/:school_id" element={<DashboardSchoolPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/class" element={<ClassPage />} />
        <Route path="/class/year/:year_id" element={<ClassYearPage />} />
        <Route path="/class/:class_id" element={<RetrieveClassPage />} />
        <Route
          path="/student/create"
          element={<CreateStudentAdmPage back="/student" />}
        />
        <Route path="/frequency" element={<FrequencyPage />} />
        <Route path="/frequency/create" element={<CreateFrequencyPage />} />
        <Route path="/frequency/:id" element={<ListFrequencyPage />} />
        <Route path="/frequency/realize" element={<RetrieveFrequencyPage />} />
        <Route path="/frequency/list" element={<ListFrequencyPage />} />
        <Route path="/frequency/open" element={<FrequencyOpenPage />} />
        <Route path="/frequency/student" element={<StudentFrequencyPage />} />
        <Route
          path="/frequency/student/list"
          element={<ListStudentFrequencyPage />}
        />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/profile/edit/password" element={<EditPasswordPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

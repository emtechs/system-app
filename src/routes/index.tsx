import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  ActiveClassPage,
  ActiveSchoolPage,
  ActiveUserPage,
  CreateAdmPage,
  CreateClassPage,
  CreateDirectorPage,
  CreateFrequencyPage,
  CreateSchoolPage,
  CreateServerPage,
  CreateStudentAdmPage,
  DashboardPage,
  DefineDiretPage,
  DefineSchoolsPage,
  DefineSecretPage,
  EditClassPage,
  EditPasswordPage,
  EditProfilePage,
  EditSchoolPage,
  FrequencyPage,
  ImportClassPage,
  ImportSchoolPage,
  ImportStudentPage,
  ListClassPage,
  ListClassSchoolPage,
  ListFrequencyClosedAdm,
  ListFrequencyPage,
  ListSchoolPage,
  ListStudentPage,
  ListUserPage,
  PasswordPage,
  ReportClassPage,
  ReportRetrievePage,
  RetrieveClassPage,
  RetrieveFrequencyPage,
  RetrieveSchoolPage,
  RetrieveUserPage,
} from "../pages";
import {
  ProtectedAdmin,
  ProtectedAuth,
  ProtectedSchool,
} from "../shared/components";

const AppRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/password/:userId/:token" element={<PasswordPage />} />
      <Route element={<ProtectedAuth />}>
        <Route element={<ProtectedAdmin />}>
          <Route path="/user/create" element={<CreateAdmPage />} />
          <Route
            path="/user/create/director"
            element={<CreateDirectorPage />}
          />
          <Route path="/user/define/secret" element={<DefineSecretPage />} />
          <Route path="/user/active" element={<ActiveUserPage />} />
          <Route path="/school/list" element={<ListSchoolPage />} />
          <Route path="/class/list" element={<ListClassPage />} />
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
        </Route>
        <Route element={<ProtectedSchool />}>
          <Route path="/user/list" element={<ListUserPage />} />
          <Route path="/user" element={<RetrieveUserPage />} />
          <Route path="/school" element={<RetrieveSchoolPage />} />
          <Route path="/school/create" element={<CreateSchoolPage />} />
          <Route path="/school/create/server" element={<CreateServerPage />} />
          <Route path="/school/define/diret" element={<DefineDiretPage />} />
          <Route path="/school/edit" element={<EditSchoolPage />} />
          <Route path="/school/active" element={<ActiveSchoolPage />} />
          <Route path="/school/class" element={<ListClassSchoolPage />} />
        </Route>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/class" element={<RetrieveClassPage />} />
        <Route
          path="/class/create"
          element={<CreateClassPage back="/class" />}
        />
        <Route path="/class/define/school" element={<DefineSchoolsPage />} />
        <Route path="/class/edit" element={<EditClassPage back="/class" />} />
        <Route
          path="/class/active"
          element={<ActiveClassPage back="/class" />}
        />
        <Route
          path="/student/create"
          element={<CreateStudentAdmPage back="/student" />}
        />
        <Route path="/frequency" element={<FrequencyPage />} />
        <Route path="/frequency/create" element={<CreateFrequencyPage />} />
        <Route path="/frequency/:id" element={<ListFrequencyPage />} />
        <Route path="/frequency/realize" element={<RetrieveFrequencyPage />} />
        <Route path="/frequency/list" element={<ListFrequencyClosedAdm />} />
        <Route
          path="/report/class"
          element={<ReportClassPage back="/report" />}
        />
        <Route
          path="/report/class/retrieve"
          element={<ReportRetrievePage back="/report" />}
        />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/profile/edit/password" element={<EditPasswordPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

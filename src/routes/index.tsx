import { Navigate, Route, Routes } from "react-router-dom";
import {
  ActiveClass,
  ActiveSchool,
  ActiveUser,
  ClassPage,
  CreateAdm,
  CreateClass,
  CreateFrequency,
  CreateSchool,
  CreateServerAdm,
  CreateStudentAdm,
  Dashboard,
  DefineDiret,
  DefineSchools,
  DefineSecret,
  EditClass,
  EditPassword,
  EditProfile,
  EditSchool,
  Frequency,
  Import,
  ImportClassPage,
  ImportSchoolPage,
  ImportStudentPage,
  ListClass,
  ListFrequency,
  ListSchool,
  ListUser,
  Report,
  ReportClass,
  ReportRetrieve,
  RetrieveClass,
  RetrieveFrequency,
  RetrieveUser,
  School,
  Student,
} from "../pages";
import { ProtectedAdmin } from "../shared/components";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedAdmin />}>
        <Route path="/user/create" element={<CreateAdm />} />
        <Route path="/user/define/secret" element={<DefineSecret />} />
        <Route path="/user/list" element={<ListUser />} />
        <Route path="/user/list/:id" element={<RetrieveUser />} />
        <Route path="/user/active" element={<ActiveUser />} />
      </Route>
      <Route path="/" element={<Dashboard />} />
      <Route path="/school" element={<School />} />
      <Route path="/school/create" element={<CreateSchool back="/school" />} />
      <Route
        path="/school/create/server"
        element={<CreateServerAdm back="/school" />}
      />
      <Route
        path="/school/define/diret"
        element={<DefineDiret back="/school" />}
      />
      <Route path="/school/edit" element={<EditSchool back="/school" />} />
      <Route path="/school/list" element={<ListSchool back="/school" />} />
      <Route path="/school/active" element={<ActiveSchool back="/school" />} />
      <Route path="/class" element={<ClassPage />} />
      <Route
        path="/class/:class_id/:school_id/:school_year_id"
        element={<RetrieveClass />}
      />
      <Route
        path="/class/list/:school_id/:school_year_id"
        element={<ListClass />}
      />
      <Route path="/class/create" element={<CreateClass back="/class" />} />
      <Route
        path="/class/define/school"
        element={<DefineSchools back="/class" />}
      />
      <Route path="/class/edit" element={<EditClass back="/class" />} />
      <Route path="/class/list" element={<ListClass />} />
      <Route path="/class/active" element={<ActiveClass back="/class" />} />
      <Route path="/student" element={<Student />} />
      <Route
        path="/student/create"
        element={<CreateStudentAdm back="/student" />}
      />
      <Route path="/frequency" element={<Frequency />} />
      <Route path="/frequency/create" element={<CreateFrequency />} />
      <Route path="/frequency/:id" element={<RetrieveFrequency />} />
      <Route path="/frequency/list" element={<ListFrequency />} />
      <Route path="/report" element={<Report />} />
      <Route path="/report/class" element={<ReportClass back="/report" />} />
      <Route
        path="/report/class/retrieve"
        element={<ReportRetrieve back="/report" />}
      />
      <Route path="/import" element={<Import />} />
      <Route
        path="/import/school"
        element={<ImportSchoolPage back="/school" />}
      />
      <Route path="/import/class" element={<ImportClassPage back="/class" />} />
      <Route
        path="/import/student"
        element={<ImportStudentPage back="/student" />}
      />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/profile/edit/password" element={<EditPassword />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

import { Navigate, Route, Routes } from 'react-router-dom'
import {
  ClassPage,
  DashboardSchoolPage,
  FrequencyDayPage,
  FrequencyPage,
  HomePage,
  Login,
  PeriodPage,
  RetrieveClassPage,
  RetrieveFrequencyPage,
  RetrievePeriodPage,
  RetrieveSchoolPage,
  RetrieveUserPage,
  SchoolPage,
  StudentPage,
  UserPage,
  ViewClassPage,
  ViewDashboardSchoolPage,
  ViewSchoolPage,
  ViewUserPage,
} from '../pages'
import { ProtectedAdmin, ProtectedAuth } from '../shared/components'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedAuth />}>
        <Route element={<ProtectedAdmin />}>
          <Route path="/dash" element={<HomePage isHome />} />
          <Route path="/user" element={<UserPage />}>
            <Route path=":user_id" element={<RetrieveUserPage />}>
              <Route path=":view" element={<ViewUserPage />} />
            </Route>
          </Route>
          <Route path="/school" element={<SchoolPage />}>
            <Route path=":school_id" element={<RetrieveSchoolPage />}>
              <Route path=":view" element={<ViewSchoolPage />} />
            </Route>
          </Route>
          <Route path="/class" element={<ClassPage />}>
            <Route path=":class_id" element={<RetrieveClassPage />}>
              <Route path=":view" element={<ViewClassPage />} />
            </Route>
          </Route>
          <Route path="/student" element={<StudentPage />}>
            <Route path=":student_id" element={<RetrieveSchoolPage />}>
              <Route path=":view" element={<ViewSchoolPage />} />
            </Route>
          </Route>
          <Route path="/frequency" element={<FrequencyPage />} />
          <Route path="/period" element={<PeriodPage />}>
            <Route path=":year_id" element={<RetrievePeriodPage />} />
          </Route>
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/:school_id/day" element={<FrequencyDayPage />}>
          <Route path=":frequency_id" element={<RetrieveFrequencyPage />} />
        </Route>
        <Route path="/:school_id" element={<DashboardSchoolPage />}>
          <Route path=":view" element={<ViewDashboardSchoolPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes

import { useParams } from 'react-router-dom'
import { Footer } from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import {
  ViewDashboardSchoolClassPage,
  ViewDashboardSchoolReportPage,
  ViewDashboardSchoolStudentPage,
} from './view'

export const ViewDashboardSchoolPage = () => {
  const { view } = useParams()

  switch (view) {
    case 'class':
      return <ViewDashboardSchoolClassPage />
    case 'student':
      return <ViewDashboardSchoolStudentPage />
    case 'report':
      return <ViewDashboardSchoolReportPage />
  }

  return (
    <LayoutBasePage title={<></>} tools={<></>}>
      <Footer />
    </LayoutBasePage>
  )
}

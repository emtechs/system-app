import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useVerifyYear, LayoutBasePage, Footer } from '../../shared'
import {
  ViewDashboardSchoolClassPage,
  ViewDashboardSchoolFrequencyPage,
  ViewDashboardSchoolReportPage,
  ViewDashboardSchoolStudentPage,
} from './view'

export const ViewDashboardSchoolPage = () => {
  const { view } = useParams()
  const [searchParams] = useSearchParams()
  const year_id = searchParams.get('year_id') || undefined
  const { verifyYear } = useVerifyYear()

  useEffect(() => {
    if (year_id && year_id !== 'none') verifyYear(year_id)
  }, [verifyYear, year_id])

  switch (view) {
    case 'class':
      return <ViewDashboardSchoolClassPage />
    case 'student':
      return <ViewDashboardSchoolStudentPage />
    case 'frequency':
      return <ViewDashboardSchoolFrequencyPage year_id={year_id} />
    case 'report':
      return <ViewDashboardSchoolReportPage />
  }

  return (
    <LayoutBasePage title={<></>} tools={<></>}>
      <Footer />
    </LayoutBasePage>
  )
}

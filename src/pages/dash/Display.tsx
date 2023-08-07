import { useEffect } from 'react'
import { Outlet, useParams, useSearchParams } from 'react-router-dom'
import { useVerifyYear } from '../../shared'
import {
  ViewDashboardSchoolClassPage,
  ViewDashboardSchoolFrequencyPage,
  ViewDashboardSchoolInfrequencyPage,
  ViewDashboardSchoolReportPage,
  ViewDashboardSchoolStudentPage,
} from './view'
import { z } from 'zod'

export const ViewDashboardSchoolPage = () => {
  const { view, id } = useParams()
  const [searchParams] = useSearchParams()
  const year_id = searchParams.get('year_id') || undefined
  const { verifyYear } = useVerifyYear()

  useEffect(() => {
    if (z.string().uuid().safeParse(year_id).success) verifyYear(year_id)
  }, [verifyYear, year_id])

  if (id) return <Outlet />

  switch (view) {
    case 'class':
      return <ViewDashboardSchoolClassPage />
    case 'student':
      return <ViewDashboardSchoolStudentPage />
    case 'frequency':
      return <ViewDashboardSchoolFrequencyPage year_id={year_id} />
    case 'report':
      return <ViewDashboardSchoolReportPage />
    case 'infrequency':
      return <ViewDashboardSchoolInfrequencyPage year_id={year_id} />
    default:
      return <></>
  }
}

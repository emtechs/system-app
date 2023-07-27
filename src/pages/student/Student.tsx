import { useEffect } from 'react'
import { useParams, Outlet } from 'react-router-dom'
import {
  Footer,
  TabsStudentYearPage,
  TitleClassPage,
  ToolsSchool,
} from '../../shared/components'
import { useVerifyYear } from '../../shared/hooks'
import { LayoutBasePage } from '../../shared/layouts'
import { ViewStudentPage } from './view'

export const StudentPage = () => {
  const { year_id } = useParams()
  const { verifyYear } = useVerifyYear()

  useEffect(() => {
    if (year_id) verifyYear(year_id)
  }, [verifyYear, year_id])

  if (year_id) return <Outlet />

  return (
    <LayoutBasePage
      title={<TitleClassPage />}
      tools={
        <ToolsSchool
          isHome
          isSearch
          isDirector
          isActive
          isNew
          titleNew="Nova"
          isReset
        />
      }
    >
      <TabsStudentYearPage />
      <ViewStudentPage />
      <Footer />
    </LayoutBasePage>
  )
}

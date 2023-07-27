import { useEffect } from 'react'
import { useParams, Outlet } from 'react-router-dom'
import {
  Footer,
  TabsStudentYearPage,
  TitleBasePage,
  ToolsSchool,
} from '../../shared/components'
import { useVerifyYear } from '../../shared/hooks'
import { LayoutBasePage } from '../../shared/layouts'
import { ViewStudentPage } from './view'
import { Groups } from '@mui/icons-material'
import { Chip } from '@mui/material'
import { StudentNonePage } from './None'

export const StudentPage = () => {
  const { year_id } = useParams()
  const { verifyYear } = useVerifyYear()

  useEffect(() => {
    if (year_id && year_id !== 'none') verifyYear(year_id)
  }, [verifyYear, year_id])

  if (year_id) return year_id === 'none' ? <StudentNonePage /> : <Outlet />

  return (
    <LayoutBasePage
      title={
        <TitleBasePage>
          <Chip
            label="Alunos"
            color="primary"
            icon={<Groups sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBasePage>
      }
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

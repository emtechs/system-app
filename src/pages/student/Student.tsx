import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { Groups } from '@mui/icons-material'
import { Chip } from '@mui/material'
import {
  useVerifyYear,
  LayoutBasePage,
  TitleBasePage,
  Tools,
  Footer,
} from '../../shared'
import {
  ViewStudentAbsencesPage,
  ViewStudentNonePage,
  ViewStudentPage,
  ViewStudentYearPage,
} from './view'
import { TabsStudentPage } from './components'

export const StudentPage = () => {
  const [searchParams] = useSearchParams()
  const year_id = searchParams.get('year_id') || undefined
  const { verifyYear } = useVerifyYear()

  useEffect(() => {
    if (z.string().uuid().safeParse(year_id).success) verifyYear(year_id)
  }, [verifyYear, year_id])

  if (year_id) {
    switch (year_id) {
      case 'none':
        return <ViewStudentNonePage />

      case 'absences':
        return <ViewStudentAbsencesPage />

      default:
        return <ViewStudentYearPage year_id={year_id} />
    }
  }

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
      tools={<Tools isHome isSearch isNew isReset />}
    >
      <TabsStudentPage />
      <ViewStudentPage />
      <Footer />
    </LayoutBasePage>
  )
}

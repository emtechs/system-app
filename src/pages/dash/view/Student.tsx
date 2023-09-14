import { Groups } from '@mui/icons-material'
import { Chip } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import {
  LayoutBasePage,
  TitleSchoolDashViewPage,
  Tools,
  Footer,
} from '../../../shared'
import { TabsDashboardSchoolStudentPage } from '../components'
import {
  ViewDashboardSchoolStudentAbsencesPage,
  ViewDashboardSchoolStudentAllPage,
} from './data'

export const ViewDashboardSchoolStudentPage = () => {
  const [searchParams] = useSearchParams()
  const view = searchParams.get('view') || undefined
  return (
    <LayoutBasePage
      title={
        <TitleSchoolDashViewPage>
          <Chip
            color="primary"
            label="Alunos"
            icon={<Groups sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleSchoolDashViewPage>
      }
      tools={<Tools isSearch isReset />}
    >
      <TabsDashboardSchoolStudentPage value={view} />
      {view ? (
        <ViewDashboardSchoolStudentAbsencesPage />
      ) : (
        <ViewDashboardSchoolStudentAllPage />
      )}
      <Footer />
    </LayoutBasePage>
  )
}

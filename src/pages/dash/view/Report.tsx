import { Chip } from '@mui/material'
import { Summarize } from '@mui/icons-material'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  LayoutBasePage,
  TitleSchoolDashViewPage,
  Footer,
} from '../../../shared'
import {
  CardDashboardSchoolReportPage,
  TabsDashboardSchoolReportPage,
} from '../components'

export const ViewDashboardSchoolReportPage = () => {
  const { school_id } = useParams()
  const [searchParams] = useSearchParams()
  const view = searchParams.get('view') || undefined

  return (
    <LayoutBasePage
      title={
        <TitleSchoolDashViewPage>
          <Chip
            color="primary"
            label="Relatório"
            icon={<Summarize sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleSchoolDashViewPage>
      }
    >
      <TabsDashboardSchoolReportPage
        href={`/${school_id}/report`}
        value={view}
      />
      <CardDashboardSchoolReportPage view={view} />
      <Footer />
    </LayoutBasePage>
  )
}

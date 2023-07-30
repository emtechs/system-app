import { Chip } from '@mui/material'
import { Summarize } from '@mui/icons-material'
import { Footer, TitleSchoolDashViewPage } from '../../../shared/components'
import { LayoutBasePage } from '../../../shared/layouts'
import { CardDashboardSchoolReportPage } from '../components'

export const ViewDashboardSchoolReportPage = () => {
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
      <CardDashboardSchoolReportPage />
      <Footer />
    </LayoutBasePage>
  )
}

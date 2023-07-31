import { Today } from '@mui/icons-material'
import { Chip } from '@mui/material'
import { Footer, TitleBasePage, Tools } from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { ViewPeriodPage } from './view'

export const PeriodPage = () => {
  return (
    <LayoutBasePage
      title={
        <TitleBasePage>
          <Chip
            label="Período"
            color="primary"
            icon={<Today sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBasePage>
      }
      tools={<Tools isHome isNew isSearch isReset />}
    >
      <ViewPeriodPage />
      <Footer />
    </LayoutBasePage>
  )
}

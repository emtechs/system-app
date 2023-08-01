import { Checklist } from '@mui/icons-material'
import { Chip } from '@mui/material'
import { LayoutBasePage, TitleBasePage, Tools, Footer } from '../../shared'
import { ViewFrequencyPage } from './view'

export const FrequencyPage = () => {
  return (
    <LayoutBasePage
      title={
        <TitleBasePage>
          <Chip
            label="Frequências"
            color="primary"
            icon={<Checklist sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBasePage>
      }
      tools={<Tools isHome isSearch isReset />}
    >
      <ViewFrequencyPage />
      <Footer />
    </LayoutBasePage>
  )
}

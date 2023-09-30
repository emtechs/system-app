import { z } from 'zod'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Checklist } from '@mui/icons-material'
import { Chip } from '@mui/material'
import {
  LayoutBasePage,
  TitleBasePage,
  Tools,
  Footer,
  useVerifyYear,
  TabsFrequencyPage,
} from '../../shared'
import {
  ViewFrequencyDayPage,
  ViewFrequencyNonePage,
  ViewFrequencyPage,
  ViewFrequencyYearPage,
} from './view'

export const FrequencyPage = () => {
  const [searchParams] = useSearchParams()
  const year_id = searchParams.get('year_id') || undefined
  const { verifyYear } = useVerifyYear()

  useEffect(() => {
    if (z.string().uuid().safeParse(year_id).success) verifyYear(year_id)
  }, [verifyYear, year_id])

  if (year_id) {
    switch (year_id) {
      case 'none':
        return <ViewFrequencyNonePage />

      case 'day':
        return <ViewFrequencyDayPage />

      default:
        return <ViewFrequencyYearPage year_id={year_id} />
    }
  }

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
      <TabsFrequencyPage value={year_id} />
      <ViewFrequencyPage />
      <Footer />
    </LayoutBasePage>
  )
}

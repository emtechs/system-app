import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Today } from '@mui/icons-material'
import { Chip } from '@mui/material'
import {
  useVerifyYear,
  LayoutBasePage,
  TitleBasePage,
  Tools,
  Footer,
} from '../../shared'
import { ViewPeriodPage } from './view'

export const PeriodPage = () => {
  const { year_id } = useParams()
  const { verifyYear } = useVerifyYear()

  useEffect(() => {
    if (year_id) verifyYear(year_id)
  }, [year_id, verifyYear])

  if (year_id) return <Outlet />

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

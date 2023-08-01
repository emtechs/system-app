import { useEffect } from 'react'
import { Outlet, useParams, useSearchParams } from 'react-router-dom'
import { Workspaces } from '@mui/icons-material'
import { Chip } from '@mui/material'
import {
  useVerifyClass,
  useVerifyYear,
  LayoutBasePage,
  Tools,
  Footer,
  TitleBasePage,
} from '../../shared'
import { TabsClassPage } from './components'
import { ViewClassKeyPage, ViewClassPage, ViewClassYearPage } from './view'

export const ClassPage = () => {
  const [searchParams] = useSearchParams()
  const year_id = searchParams.get('year_id') || undefined
  const { class_id } = useParams()
  const { verifyClass } = useVerifyClass()
  const { verifyYear } = useVerifyYear()

  useEffect(() => {
    if (class_id && class_id !== 'key') verifyClass(class_id)
    if (year_id) verifyYear(year_id)
  }, [class_id, verifyClass, verifyYear, year_id])

  if (class_id) return class_id === 'key' ? <ViewClassKeyPage /> : <Outlet />

  if (year_id) return <ViewClassYearPage year_id={year_id} />

  return (
    <LayoutBasePage
      title={
        <TitleBasePage>
          <Chip
            label="Turmas"
            color="primary"
            icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBasePage>
      }
      tools={<Tools isHome isSearch isNew titleNew="Nova" isReset />}
    >
      <TabsClassPage />
      <ViewClassPage />
      <Footer />
    </LayoutBasePage>
  )
}

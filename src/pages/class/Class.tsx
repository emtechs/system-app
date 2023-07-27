import { Outlet, useParams } from 'react-router-dom'
import {
  Footer,
  TabsClassYearPage,
  TitleBasePage,
  ToolsSchool,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { useEffect } from 'react'
import { ViewClass } from './view'
import { useVerifyClass, useVerifyYear } from '../../shared/hooks'
import { Workspaces } from '@mui/icons-material'
import { Chip } from '@mui/material'

export const ClassPage = () => {
  const { class_id, year_id } = useParams()
  const { verifyClass } = useVerifyClass()
  const { verifyYear } = useVerifyYear()

  useEffect(() => {
    if (class_id) verifyClass(class_id)
    if (year_id) verifyYear(year_id)
  }, [class_id, verifyClass, verifyYear, year_id])

  if (class_id) return <Outlet />

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
      tools={
        <ToolsSchool isHome isSearch isActive isNew titleNew="Nova" isReset />
      }
    >
      <TabsClassYearPage />
      <ViewClass />
      <Footer />
    </LayoutBasePage>
  )
}

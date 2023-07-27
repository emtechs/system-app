import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Chip } from '@mui/material'
import { Workspaces } from '@mui/icons-material'
import {
  Footer,
  TabsClassYearPage,
  TitleBasePage,
  ToolsSchool,
} from '../../shared/components'
import {
  useVerifyClass,
  useVerifyClassKey,
  useVerifyYear,
} from '../../shared/hooks'
import { LayoutBasePage } from '../../shared/layouts'
import { ViewClass } from './view'

export const ClassPage = () => {
  const { class_id, year_id, key } = useParams()
  const { verifyClass } = useVerifyClass()
  const { verifyYear } = useVerifyYear()
  const { verifyClassKey } = useVerifyClassKey()

  useEffect(() => {
    if (class_id) verifyClass(class_id)
    if (year_id) verifyYear(year_id)
    if (key) verifyClassKey(key)
  }, [class_id, key, verifyClass, verifyClassKey, verifyYear, year_id])

  if (class_id || year_id || key) return <Outlet />

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

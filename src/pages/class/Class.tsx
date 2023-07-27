import { Outlet, useParams } from 'react-router-dom'
import {
  Footer,
  TabsClassYearPage,
  TitleClassPage,
  ToolsSchool,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { useEffect } from 'react'
import { ViewClass } from './view'
import { useVerifyClass, useVerifyYear } from '../../shared/hooks'

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
      title={<TitleClassPage />}
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

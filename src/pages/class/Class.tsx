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
import { useVerifyClass } from '../../shared/hooks'

export const ClassPage = () => {
  const { class_id } = useParams()
  const { verifyClass } = useVerifyClass()

  useEffect(() => {
    if (class_id) verifyClass(class_id)
  }, [class_id, verifyClass])

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

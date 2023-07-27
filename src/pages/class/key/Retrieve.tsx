import { Outlet, useParams } from 'react-router-dom'
import { ToolsSchool, Footer } from '../../../shared/components'
import { LayoutBasePage } from '../../../shared/layouts'

export const RetrieveClassKeyPage = () => {
  const { view } = useParams()

  if (view) return <Outlet />

  return (
    <LayoutBasePage title={<></>} tools={<ToolsSchool isDash back="/school" />}>
      <Footer />
    </LayoutBasePage>
  )
}

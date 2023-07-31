import { Outlet, useParams } from 'react-router-dom'
import { LayoutBasePage, Tools, Footer } from '../../../shared'

export const RetrieveClassKeyPage = () => {
  const { view } = useParams()

  if (view) return <Outlet />

  return (
    <LayoutBasePage title={<></>} tools={<Tools isDash back="/school" />}>
      <Footer />
    </LayoutBasePage>
  )
}

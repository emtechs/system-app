import { Outlet, useParams } from 'react-router-dom'
import { LayoutBasePage } from '../../shared/layouts'
import {
  Footer,
  TabsUserRetrievePage,
  TitleUserRetrievePage,
  ToolsUser,
} from '../../shared/components'
import { ViewRetrieveUserPage } from './view'

export const RetrieveUserPage = () => {
  const { view } = useParams()

  if (view) return <Outlet />

  return (
    <LayoutBasePage
      title={<TitleUserRetrievePage />}
      tools={<ToolsUser back="/user" />}
    >
      <TabsUserRetrievePage value={view} />
      <ViewRetrieveUserPage />
      <Footer />
    </LayoutBasePage>
  )
}

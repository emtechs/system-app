import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import {
  useUserContext,
  LayoutBasePage,
  TitleUserRetrievePage,
  Tools,
  TabsUserRetrievePage,
  Footer,
} from '../../shared'
import { ViewRetrieveUserPage } from './view'

export const RetrieveUserPage = () => {
  const { view, user_id } = useParams()
  const { userDataRetrieve, userSelect } = useUserContext()

  useEffect(() => {
    if (user_id) {
      if (userSelect?.id !== user_id) userDataRetrieve(user_id, '')
    }
  }, [user_id])

  if (view) return <Outlet />

  return (
    <LayoutBasePage title={<TitleUserRetrievePage />} tools={<Tools isBack />}>
      <TabsUserRetrievePage value={view} />
      <ViewRetrieveUserPage />
      <Footer />
    </LayoutBasePage>
  )
}

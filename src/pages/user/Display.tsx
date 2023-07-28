import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Footer,
  TabsUserRetrievePage,
  TitleUserRetrievePage,
  TitleUserViewFrequencyPage,
  TitleUserViewHistoryPage,
  ToolsUser,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { ViewUserSchoolPage } from './view'

export const ViewUserPage = () => {
  const { view } = useParams()
  const [title, setTitle] = useState(<TitleUserRetrievePage />)
  const [tools, setTools] = useState(<ToolsUser back="/user" />)
  const [viewData, setViewData] = useState(<></>)

  useEffect(() => {
    switch (view) {
      case 'frequency':
        setTitle(<TitleUserViewFrequencyPage />)
        setViewData(<></>)
        setTools(<ToolsUser back="/user" />)
        break

      case 'history':
        setTitle(<TitleUserViewHistoryPage />)
        setViewData(<></>)
        setTools(<ToolsUser back="/user" />)
        break
    }
  }, [view])

  switch (view) {
    case 'school':
      return <ViewUserSchoolPage />
  }

  return (
    <LayoutBasePage title={title} tools={tools}>
      <TabsUserRetrievePage value={view} />
      {viewData}
      <Footer />
    </LayoutBasePage>
  )
}

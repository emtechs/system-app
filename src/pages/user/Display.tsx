import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  TitleUserRetrievePage,
  Tools,
  TitleUserViewFrequencyPage,
  TitleUserViewHistoryPage,
  LayoutBasePage,
  TabsUserRetrievePage,
  Footer,
} from '../../shared'
import { ViewUserSchoolPage } from './view'

export const ViewUserPage = () => {
  const { view } = useParams()
  const [title, setTitle] = useState(<TitleUserRetrievePage />)
  const [tools, setTools] = useState(<Tools isBack />)
  const [viewData, setViewData] = useState(<></>)

  useEffect(() => {
    switch (view) {
      case 'frequency':
        setTitle(<TitleUserViewFrequencyPage />)
        setViewData(<></>)
        setTools(<Tools isBack />)
        break

      case 'history':
        setTitle(<TitleUserViewHistoryPage />)
        setViewData(<></>)
        setTools(<Tools isBack />)
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

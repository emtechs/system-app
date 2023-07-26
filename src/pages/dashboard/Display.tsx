import { useParams } from 'react-router-dom'
import {
  Footer,
  TitleSchoolRetrievePage,
  ToolsSchool,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { useEffect, useState } from 'react'
import { ViewStudent } from '../../shared/views'

export const ViewDashboardSchoolPage = () => {
  const { view } = useParams()
  const [title, setTitle] = useState(<TitleSchoolRetrievePage />)
  const [tools, setTools] = useState(<ToolsSchool back="/school" />)
  const [viewData, setViewData] = useState(<></>)

  useEffect(() => {
    switch (view) {
      case 'student':
        setTitle(<TitleSchoolRetrievePage />)
        setViewData(<ViewStudent />)
        setTools(
          <ToolsSchool back="/school" isNew titleNew="Aluno" isDash isSearch />,
        )
        break

      case 'frequency':
        setViewData(<></>)
        setTools(<ToolsSchool isDash back="/school" />)
        break

      case 'infrequency':
        setViewData(<></>)
        setTools(<ToolsSchool isDash back="/school" />)
        break
    }
  }, [view])

  return (
    <LayoutBasePage title={title} tools={tools}>
      {viewData}
      <Footer />
    </LayoutBasePage>
  )
}

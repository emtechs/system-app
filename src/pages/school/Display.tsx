import { useParams } from 'react-router-dom'
import {
  Footer,
  TabsSchoolRetrievePage,
  TitleSchoolRetrievePage,
  TitleSchoolViewClassPage,
  TitleSchoolViewServerPage,
  TitleSchoolViewStundetPage,
  ToolsSchool,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { useEffect, useState } from 'react'
import { PersonAdd } from '@mui/icons-material'
import { ViewClass, ViewServer } from './view'
import { ViewStudent } from '../../shared/views'

export const ViewSchoolPage = () => {
  const { view } = useParams()
  const [title, setTitle] = useState(<TitleSchoolRetrievePage />)
  const [tools, setTools] = useState(<ToolsSchool back="/school" />)
  const [viewData, setViewData] = useState(<></>)

  useEffect(() => {
    switch (view) {
      case 'server':
        setTitle(<TitleSchoolViewServerPage />)
        setViewData(<ViewServer />)
        setTools(
          <ToolsSchool
            back="/school"
            iconNew={<PersonAdd />}
            isNew
            titleNew="Servidor"
            isSearch
            isDash
          />,
        )
        break

      case 'class':
        setTitle(<TitleSchoolViewClassPage />)
        setViewData(<ViewClass />)
        setTools(
          <ToolsSchool back="/school" isNew titleNew="Turma" isDash isSearch />,
        )
        break

      case 'student':
        setTitle(<TitleSchoolViewStundetPage />)
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
      <TabsSchoolRetrievePage value={view} />
      {viewData}
      <Footer />
    </LayoutBasePage>
  )
}

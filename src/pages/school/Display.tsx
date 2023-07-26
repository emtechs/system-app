import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Chip } from '@mui/material'
import { Groups } from '@mui/icons-material'
import {
  Footer,
  TabsSchoolRetrievePage,
  TitleSchoolRetrievePage,
  TitleSchoolViewPage,
  ToolsSchool,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { ViewSchoolStudent } from '../../shared/views'
import { ViewSchoolClassPage, ViewSchoolServerPage } from './view'

export const ViewSchoolPage = () => {
  const { view } = useParams()
  const [title, setTitle] = useState(<TitleSchoolRetrievePage />)
  const [tools, setTools] = useState(<ToolsSchool back="/school" />)
  const [viewData, setViewData] = useState(<></>)

  useEffect(() => {
    switch (view) {
      case 'student':
        setTitle(
          <TitleSchoolViewPage>
            <Chip
              color="primary"
              label="Alunos"
              icon={<Groups sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleSchoolViewPage>,
        )
        setViewData(<ViewSchoolStudent />)
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

  switch (view) {
    case 'server':
      return <ViewSchoolServerPage />
    case 'class':
      return <ViewSchoolClassPage />
  }

  return (
    <LayoutBasePage title={title} tools={tools}>
      <TabsSchoolRetrievePage value={view} />
      {viewData}
      <Footer />
    </LayoutBasePage>
  )
}

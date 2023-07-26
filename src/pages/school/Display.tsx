import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Chip } from '@mui/material'
import { Groups, People, PersonAdd, Workspaces } from '@mui/icons-material'
import {
  Footer,
  TabsSchoolRetrievePage,
  TitleSchoolRetrievePage,
  TitleSchoolViewPage,
  ToolsSchool,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
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
        setTitle(
          <TitleSchoolViewPage>
            <Chip
              color="primary"
              label="Servidores"
              icon={<People sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleSchoolViewPage>,
        )
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
        setTitle(
          <TitleSchoolViewPage>
            <Chip
              color="primary"
              label="Turmas"
              icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleSchoolViewPage>,
        )
        setViewData(<ViewClass />)
        setTools(
          <ToolsSchool back="/school" isNew titleNew="Turma" isDash isSearch />,
        )
        break

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

import { useParams } from 'react-router-dom'
import {
  Footer,
  TitleSchoolDashPage,
  TitleSchoolDashViewPage,
  ToolsSchool,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { useEffect, useState } from 'react'
import { ViewDashSchoolClass, ViewDashSchoolStudent } from '../../shared/views'
import { Groups, Workspaces } from '@mui/icons-material'
import { Chip } from '@mui/material'

export const ViewDashboardSchoolPage = () => {
  const { view } = useParams()
  const [title, setTitle] = useState(<TitleSchoolDashPage />)
  const [tools, setTools] = useState(<ToolsSchool back="/school" />)
  const [viewData, setViewData] = useState(<></>)

  useEffect(() => {
    switch (view) {
      case 'class':
        setTitle(
          <TitleSchoolDashViewPage>
            <Chip
              color="primary"
              label="Turmas"
              icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleSchoolDashViewPage>,
        )
        setViewData(<ViewDashSchoolClass />)
        setTools(<ToolsSchool isSearch />)
        break

      case 'student':
        setTitle(
          <TitleSchoolDashViewPage>
            <Chip
              color="primary"
              label="Alunos"
              icon={<Groups sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleSchoolDashViewPage>,
        )
        setViewData(<ViewDashSchoolStudent />)
        setTools(<ToolsSchool isSearch />)
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

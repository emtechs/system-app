import { SyntheticEvent, useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Chip } from '@mui/material'
import { Workspaces } from '@mui/icons-material'
import {
  ToolsSchool,
  TitleSchoolViewPage,
  TitleClassRetrievePage,
  TabsClassRetrievePage,
  Footer,
} from '../../../shared/components'
import { useValueTabs } from '../../../shared/hooks'
import { LayoutBasePage } from '../../../shared/layouts'
import {
  ViewClassData,
  ViewSchool,
  ViewStudent,
  ViewFrequency,
  ViewInfrequency,
} from '../../../shared/views'

export const RetrieveClassPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { class_id } = useParams()
  const viewData = searchParams.get('view') || ''
  const school_id = searchParams.get('school_id') || undefined
  const [view, setView] = useState(<ViewClassData id={class_id} />)
  const [tools, setTools] = useState(<ToolsSchool back="/school" />)
  const { valueTabs } = useValueTabs()

  const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
    setSearchParams(valueTabs(String(newValue), 'view'), { replace: true })
  }

  const title = useMemo(() => {
    if (school_id)
      return (
        <TitleSchoolViewPage>
          <Chip
            color="primary"
            label="Turmas"
            icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleSchoolViewPage>
      )
    return <TitleClassRetrievePage />
  }, [school_id])

  useEffect(() => {
    switch (viewData) {
      case 'school':
        setView(<ViewSchool id={class_id} />)
        setTools(<ToolsSchool isDash back="/school" />)
        break

      case 'student':
        setView(<ViewStudent />)
        setTools(
          <ToolsSchool back="/school" isNew titleNew="Aluno" isDash isSearch />,
        )
        break

      case 'frequency':
        setView(<ViewFrequency table_def="school" />)
        setTools(<ToolsSchool isDash back="/school" />)
        break

      case 'infrequency':
        setView(<ViewInfrequency />)
        setTools(<ToolsSchool isDash back="/school" />)
        break

      default:
        setView(<ViewClassData id={class_id} />)
        setTools(<ToolsSchool isDash back="/school" />)
    }
  }, [viewData, class_id])

  return (
    <LayoutBasePage title={title} tools={tools}>
      <TabsClassRetrievePage value={viewData} handleChange={handleChange} />
      {view}
      <Footer />
    </LayoutBasePage>
  )
}
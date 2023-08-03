import { SyntheticEvent, useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  ViewClassData,
  Tools,
  useValueTabs,
  TitleClassRetrievePage,
  ViewStudent,
  ViewFrequency,
  // ViewInfrequency,
  LayoutBasePage,
  TabsClassRetrievePage,
  Footer,
} from '../../../shared'

export const RetrieveClassPage = () => {
  const { class_id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const viewData = searchParams.get('view') || ''
  const school_id = searchParams.get('school_id') || undefined
  const [view, setView] = useState(<ViewClassData id={class_id} />)
  const [tools, setTools] = useState(<Tools back="/school" />)
  const { valueTabs } = useValueTabs()

  const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
    setSearchParams(valueTabs(String(newValue), 'view'), { replace: true })
  }

  const title = useMemo(() => {
    if (school_id) return <></>
    return <TitleClassRetrievePage />
  }, [school_id])

  useEffect(() => {
    switch (viewData) {
      case 'school':
        setView(<></>)
        setTools(<Tools isDash back="/school" />)
        break

      case 'student':
        setView(<ViewStudent />)
        setTools(
          <Tools back="/school" isNew titleNew="Aluno" isDash isSearch />,
        )
        break

      case 'frequency':
        setView(<ViewFrequency table_def="school" />)
        setTools(<Tools isDash back="/school" />)
        break

      // case 'infrequency':
      //   setView(<ViewInfrequency />)
      //   setTools(<Tools isDash back="/school" />)
      //   break

      default:
        setView(<ViewClassData id={class_id} />)
        setTools(<Tools isDash back="/school" />)
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

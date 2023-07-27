import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { LayoutBasePage } from '../../shared/layouts'
import {
  Footer,
  TitleSchoolUserPage,
  TitleUserRetrievePage,
  ToolsUser,
} from '../../shared/components'
import {
  ViewFrequency,
  ViewHistory,
  ViewSchool,
  ViewUserData,
} from '../../shared/views'

export const RetrieveUserPage = () => {
  const [searchParams] = useSearchParams()
  const { user_id } = useParams()
  const viewData = searchParams.get('view') || ''
  const school_id = searchParams.get('school_id') || undefined
  const [tools, setTools] = useState(<ToolsUser back="/user" />)
  const [view, setView] = useState(<ViewUserData />)

  const back = useMemo(() => {
    if (school_id) return `/school/${school_id}`
    return '/user'
  }, [school_id])

  const title = useMemo(() => {
    if (school_id) return <TitleSchoolUserPage />
    return <TitleUserRetrievePage />
  }, [school_id])

  useEffect(() => {
    switch (viewData) {
      case 'school':
        setView(<ViewSchool id={user_id} />)
        setTools(<ToolsUser back={back} isNew titleNew="Nova" isSearch />)
        break

      case 'frequency':
        setView(
          <ViewFrequency
            user_id={user_id}
            school_id={school_id || undefined}
            table_def={school_id ? 'school' : 'user'}
          />,
        )
        setTools(<ToolsUser back={back} />)
        break

      case 'history':
        setView(<ViewHistory />)
        setTools(<ToolsUser back={back} />)
        break

      default:
        setView(<ViewUserData />)
        setTools(<ToolsUser back={back} />)
    }
  }, [viewData, school_id, user_id, back])

  return (
    <LayoutBasePage title={title} tools={tools}>
      {view}
      <Footer />
    </LayoutBasePage>
  )
}

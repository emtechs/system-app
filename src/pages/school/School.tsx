import { Outlet, useParams, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Chip } from '@mui/material'
import { School } from '@mui/icons-material'
import {
  useVerifySchool,
  LayoutBasePage,
  TitleBasePage,
  Tools,
  Footer,
} from '../../shared'
import { ViewSchoolPage, ViewSchoolUtilPage } from './view'
import { TabsSchoolPage } from './components'

export const SchoolPage = () => {
  const [searchParams] = useSearchParams()
  const view = searchParams.get('view') || undefined
  const { school_id } = useParams()
  const { verifySchool } = useVerifySchool()

  useEffect(() => {
    if (school_id) verifySchool(school_id)
  }, [school_id, verifySchool])

  if (school_id) return <Outlet />

  if (view) return <ViewSchoolUtilPage />

  return (
    <LayoutBasePage
      title={
        <TitleBasePage>
          <Chip
            label="Escolas"
            color="primary"
            icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBasePage>
      }
      tools={
        <Tools
          isHome
          isSearch
          isDirector
          isActive
          isNew
          titleNew="Nova"
          isReset
        />
      }
    >
      <TabsSchoolPage />
      <ViewSchoolPage />
      <Footer />
    </LayoutBasePage>
  )
}

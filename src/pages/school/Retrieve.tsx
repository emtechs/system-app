import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { School } from '@mui/icons-material'
import {
  useAppThemeContext,
  useSchoolContext,
  LayoutBasePage,
  TitleBaseItemsPage,
  LinkChip,
  LabelSchool,
  Tools,
  TabsSchoolRetrievePage,
  Footer,
} from '../../shared'
import { ViewRetrieveSchoolPage } from './view'

export const RetrieveSchoolPage = () => {
  const { view, school_id } = useParams()
  const { mdDown } = useAppThemeContext()
  const { schoolSelect, schoolDataRetrieve } = useSchoolContext()

  useEffect(() => {
    if (school_id) {
      if (schoolSelect?.id !== school_id) schoolDataRetrieve(school_id, '')
    }
  }, [school_id])

  if (view) return <Outlet />

  return (
    <LayoutBasePage
      title={
        <TitleBaseItemsPage>
          <LinkChip
            label={mdDown ? '...' : 'Escolas'}
            icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
            to="/school"
          />
          <LabelSchool />
        </TitleBaseItemsPage>
      }
      tools={<Tools isDash back="/school" />}
    >
      <TabsSchoolRetrievePage value={view} />
      <ViewRetrieveSchoolPage />
      <Footer />
    </LayoutBasePage>
  )
}

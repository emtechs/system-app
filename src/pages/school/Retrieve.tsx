import { Outlet, useParams } from 'react-router-dom'
import { School } from '@mui/icons-material'
import {
  Footer,
  LabelSchool,
  LinkChip,
  TabsSchoolRetrievePage,
  TitleBaseItemsPage,
  ToolsSchool,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { useAppThemeContext } from '../../shared/contexts'
import { ViewRetrieveSchoolPage } from './view/Retrieve'

export const RetrieveSchoolPage = () => {
  const { view } = useParams()
  const { mdDown } = useAppThemeContext()

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
      tools={<ToolsSchool isDash back="/school" />}
    >
      <TabsSchoolRetrievePage value={view} />
      <ViewRetrieveSchoolPage />
      <Footer />
    </LayoutBasePage>
  )
}

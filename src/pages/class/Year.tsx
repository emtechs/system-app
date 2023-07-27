import { Workspaces } from '@mui/icons-material'
import {
  Footer,
  LabelYear,
  LinkChip,
  TabsClassYearPage,
  TitleBaseItemsPage,
  ToolsSchool,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { ViewClassYearPage } from './view'

export const ClassYearPage = () => {
  return (
    <LayoutBasePage
      title={
        <TitleBaseItemsPage>
          <LinkChip
            label="Turmas"
            icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
            to="/class"
          />
          <LabelYear />
        </TitleBaseItemsPage>
      }
      tools={<ToolsSchool isHome isSearch isNew titleNew="Nova" isReset />}
    >
      <TabsClassYearPage />
      <ViewClassYearPage />
      <Footer />
    </LayoutBasePage>
  )
}

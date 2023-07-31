import { Workspaces } from '@mui/icons-material'
import {
  LayoutBasePage,
  TitleBaseItemsPage,
  LinkChip,
  LabelYear,
  Tools,
  TabsClassYearPage,
  Footer,
} from '../../shared'
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
      tools={<Tools isHome isSearch isNew titleNew="Nova" isReset />}
    >
      <TabsClassYearPage />
      <ViewClassYearPage />
      <Footer />
    </LayoutBasePage>
  )
}

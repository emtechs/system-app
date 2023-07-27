import { Groups } from '@mui/icons-material'
import {
  Footer,
  LabelYear,
  LinkChip,
  TabsStudentYearPage,
  TitleBaseItemsPage,
  ToolsSchool,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { ViewStudentYearPage } from './view'

export const StudentYearPage = () => {
  return (
    <LayoutBasePage
      title={
        <TitleBaseItemsPage>
          <LinkChip
            label="Alunos"
            icon={<Groups sx={{ mr: 0.5 }} fontSize="inherit" />}
            to="/student"
          />
          <LabelYear />
        </TitleBaseItemsPage>
      }
      tools={<ToolsSchool isHome isSearch isNew titleNew="Nova" isReset />}
    >
      <TabsStudentYearPage />
      <ViewStudentYearPage />
      <Footer />
    </LayoutBasePage>
  )
}

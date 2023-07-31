import { Groups } from '@mui/icons-material'
import {
  LayoutBasePage,
  TitleBaseItemsPage,
  LinkChip,
  LabelYear,
  Tools,
  TabsStudentYearPage,
  Footer,
} from '../../shared'
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
      tools={<Tools isHome isSearch isNew titleNew="Nova" isReset />}
    >
      <TabsStudentYearPage />
      <ViewStudentYearPage />
      <Footer />
    </LayoutBasePage>
  )
}

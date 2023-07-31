import { Close, Groups } from '@mui/icons-material'
import { Chip } from '@mui/material'
import {
  LayoutBasePage,
  TitleBaseItemsPage,
  LinkChip,
  Tools,
  TabsStudentYearPage,
  Footer,
} from '../../shared'
import { ViewStudentNonePage } from './view'

export const StudentNonePage = () => {
  return (
    <LayoutBasePage
      title={
        <TitleBaseItemsPage>
          <LinkChip
            label="Alunos"
            icon={<Groups sx={{ mr: 0.5 }} fontSize="inherit" />}
            to="/student"
          />
          <Chip
            color="primary"
            label="Não Enturmados"
            icon={<Close sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBaseItemsPage>
      }
      tools={<Tools isHome isSearch isNew titleNew="Nova" isReset />}
    >
      <TabsStudentYearPage />
      <ViewStudentNonePage />
      <Footer />
    </LayoutBasePage>
  )
}

import { Close, Groups } from '@mui/icons-material'
import { Chip } from '@mui/material'
import {
  Footer,
  LinkChip,
  TabsStudentYearPage,
  TitleBaseItemsPage,
  ToolsSchool,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { ViewStudentYearPage } from './view'

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
      tools={<ToolsSchool isHome isSearch isNew titleNew="Nova" isReset />}
    >
      <TabsStudentYearPage />
      <ViewStudentYearPage />
      <Footer />
    </LayoutBasePage>
  )
}

import {
  Footer,
  TabsStudentYearPage,
  TitleClassPage,
  ToolsSchool,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { ViewStudentYearPage } from './view'

export const StudentYearPage = () => {
  return (
    <LayoutBasePage
      title={<TitleClassPage />}
      tools={<ToolsSchool isHome isSearch isNew titleNew="Nova" isReset />}
    >
      <TabsStudentYearPage />
      <ViewStudentYearPage />
      <Footer />
    </LayoutBasePage>
  )
}

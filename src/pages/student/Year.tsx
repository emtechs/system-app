import {
  Footer,
  TabsStudentYearPage,
  ToolsSchool,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { ViewStudentYearPage } from './view'

export const StudentYearPage = () => {
  return (
    <LayoutBasePage
      title={<></>}
      tools={<ToolsSchool isHome isSearch isNew titleNew="Nova" isReset />}
    >
      <TabsStudentYearPage />
      <ViewStudentYearPage />
      <Footer />
    </LayoutBasePage>
  )
}

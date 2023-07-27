import {
  TabsStudentYearPage,
  TitleClassPage,
  ToolsSchool,
} from '../../shared/components'
import { LayoutBasePage } from '../../shared/layouts'
import { ViewStudentPage } from './view'

export const StudentPage = () => {
  return (
    <LayoutBasePage
      title={<TitleClassPage />}
      tools={
        <ToolsSchool
          isHome
          isSearch
          isDirector
          isActive
          isNew
          titleNew="Nova"
          isReset
        />
      }
    >
      <TabsStudentYearPage />
      <ViewStudentPage />
    </LayoutBasePage>
  )
}

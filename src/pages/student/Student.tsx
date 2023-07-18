import {
  TabsStudentYearPage,
  TitleClassPage,
  ToolsSchool,
} from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { ViewStudent } from "../../shared/views";

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
      <ViewStudent />
    </LayoutBasePage>
  );
};

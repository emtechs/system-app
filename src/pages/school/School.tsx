import { Footer, TitleSchoolPage, ToolsSchool } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { ViewSchool } from "../../shared/views";

export const SchoolPage = () => {
  return (
    <LayoutBasePage
      title={<TitleSchoolPage />}
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
      <ViewSchool />
      <Footer />
    </LayoutBasePage>
  );
};

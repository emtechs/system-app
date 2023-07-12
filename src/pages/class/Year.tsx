import { TitleClassPage, ToolsSchool } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { ViewClassYear } from "../../shared/views";

export const ClassYearPage = () => {
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
      <ViewClassYear />
    </LayoutBasePage>
  );
};

import { TitleSchoolPage, ToolsSchool } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { ViewSchool } from "../../shared/views";
import { useSchoolContext } from "../../shared/contexts";

export const SchoolPage = () => {
  const { is_director, search } = useSchoolContext();
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
      <ViewSchool is_director={is_director} search={search} />
    </LayoutBasePage>
  );
};

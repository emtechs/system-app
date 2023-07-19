import {
  Footer,
  TabsClassYearPage,
  TitleClassPage,
  ToolsSchool,
} from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { ViewClass } from "../../shared/views";

export const ClassPage = () => {
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
      <TabsClassYearPage />
      <ViewClass />
      <Footer />
    </LayoutBasePage>
  );
};

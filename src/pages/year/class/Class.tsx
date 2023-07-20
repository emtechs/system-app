import { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import {
  ToolsSchool,
  Footer,
  TitleClassYearPage,
  TabsClassYearRetrievePage,
} from "../../../shared/components";
import { LayoutBasePage } from "../../../shared/layouts";
import { useVerifyClassYear } from "../../../shared/hooks";

export const ClassYearPage = () => {
  const { class_id, view } = useParams();
  const { verifyClassYear } = useVerifyClassYear();

  useEffect(() => {
    if (class_id) verifyClassYear(class_id);
  }, [class_id, verifyClassYear]);

  if (view) return <Outlet />;

  return (
    <LayoutBasePage
      title={<TitleClassYearPage />}
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
      <TabsClassYearRetrievePage value={view} />
      <Footer />
    </LayoutBasePage>
  );
};

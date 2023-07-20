import { Outlet, useParams } from "react-router-dom";
import {
  Footer,
  TabsSchoolRetrievePage,
  TitleSchoolRetrievePage,
  ToolsSchool,
} from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { useEffect } from "react";
import { useVerifyYear } from "../../shared/hooks";

export const RetrieveYearPage = () => {
  const { view, year_id } = useParams();
  const { verifyYear } = useVerifyYear();

  useEffect(() => {
    if (year_id) verifyYear(year_id);
  }, [year_id]);

  if (view) return <Outlet />;

  return (
    <LayoutBasePage
      title={<TitleSchoolRetrievePage />}
      tools={<ToolsSchool back="/school" />}
    >
      <TabsSchoolRetrievePage value={view} />
      <Footer />
    </LayoutBasePage>
  );
};

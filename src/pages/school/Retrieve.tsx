import { Outlet, useParams } from "react-router-dom";
import {
  Footer,
  TabsSchoolRetrievePage,
  TitleSchoolRetrievePage,
  ToolsSchool,
} from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { ViewSchoolData } from "./view";
import { useSchoolContext } from "../../shared/contexts";
import { useEffect } from "react";

export const RetrieveSchoolPage = () => {
  const { view, school_id } = useParams();
  const { schoolDataRetrieve, schoolSelect } = useSchoolContext();

  useEffect(() => {
    if (school_id) {
      if (schoolSelect?.id !== school_id) schoolDataRetrieve(school_id, "");
    }
  }, [school_id]);

  if (view) return <Outlet />;

  return (
    <LayoutBasePage
      title={<TitleSchoolRetrievePage />}
      tools={<ToolsSchool back="/school" />}
    >
      <TabsSchoolRetrievePage value={view} />
      <ViewSchoolData />
      <Footer />
    </LayoutBasePage>
  );
};

import { Outlet, useParams } from "react-router-dom";
import { Footer, TitleSchoolPage, ToolsSchool } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { useEffect } from "react";
import { ViewSchool } from "./view";
import { useVerifySchool } from "../../shared/hooks";

export const SchoolPage = () => {
  const { school_id } = useParams();
  const { verifySchool } = useVerifySchool();

  useEffect(() => {
    if (school_id) verifySchool(school_id);
  }, [school_id, verifySchool]);

  if (school_id) return <Outlet />;

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

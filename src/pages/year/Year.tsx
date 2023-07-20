import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { PersonAdd } from "@mui/icons-material";
import { LayoutBasePage } from "../../shared/layouts";
import {
  Footer,
  TitleSchoolRetrievePage,
  ToolsSchool,
} from "../../shared/components";
import { useVerifyYear } from "../../shared/hooks";

export const YearPage = () => {
  const { year_id } = useParams();
  const { verifyYear } = useVerifyYear();

  useEffect(() => {
    verifyYear(year_id);
  }, [verifyYear, year_id]);

  if (year_id) return <Outlet />;

  return (
    <LayoutBasePage
      title={<TitleSchoolRetrievePage />}
      tools={
        <ToolsSchool
          back="/school"
          iconNew={<PersonAdd />}
          isNew
          titleNew="Servidor"
          isSearch
          isDash
        />
      }
    >
      <Footer />
    </LayoutBasePage>
  );
};

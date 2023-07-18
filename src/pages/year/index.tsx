import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { PersonAdd } from "@mui/icons-material";
import { LayoutBasePage } from "../../shared/layouts";
import { TitleSchoolRetrievePage, ToolsSchool } from "../../shared/components";
import { ViewClassYear } from "../../shared/views";
import { useCalendarContext } from "../../shared/contexts";

export const YearPage = () => {
  const [searchParams] = useSearchParams();
  const { year_id } = useParams();
  const { verifyYear } = useCalendarContext();
  const viewData = searchParams.get("view") || "";
  const [view, setView] = useState(<></>);

  useEffect(() => {
    verifyYear(year_id);
  }, [year_id]);

  useEffect(() => {
    switch (viewData) {
      case "class":
        setView(<ViewClassYear id={year_id} />);
        break;

      case "student":
        setView(<ViewClassYear id={year_id} />);
        break;

      default:
        setView(<></>);
    }
  }, [year_id, viewData]);

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
      {view}
    </LayoutBasePage>
  );
};

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TitleClassYearPage, ToolsSchool } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { ViewClassYear } from "../../shared/views";
import { useCalendarContext } from "../../shared/contexts";

export const ClassYearPage = () => {
  const { year_id } = useParams();
  const { verifyYear } = useCalendarContext();

  useEffect(() => {
    verifyYear(year_id);
  }, [year_id]);

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
      <ViewClassYear id={year_id} />
    </LayoutBasePage>
  );
};

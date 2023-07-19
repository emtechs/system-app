import { SyntheticEvent, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../shared/contexts";
import { LayoutBasePage } from "../../shared/layouts";
import {
  Footer,
  TabsSchoolRetrievePage,
  TitleSchoolRetrievePage,
  ToolsSchool,
} from "../../shared/components";
import { useValueTabs } from "../../shared/hooks";
import { ViewClassStudent } from "./view/ClassStudent";

export const RetrieveSchoolClassPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { key, school_id } = useParams();
  const viewData = searchParams.get("view") || "";
  const { listYear } = useAuthContext();
  const [view, setView] = useState(<></>);
  const [tools, setTools] = useState(<></>);
  const { valueTabs } = useValueTabs();

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams(valueTabs(newValue, "view"), { replace: true });
  };

  useEffect(() => {
    switch (viewData) {
      case "student":
        setView(<ViewClassStudent id={key} />);
        setTools(
          <ToolsSchool
            back={`/school/${school_id}`}
            isNew
            titleNew="Aluno"
            isDash
            isSearch
          />
        );
        break;

      default:
        setView(<></>);
        setTools(<></>);
    }
  }, [viewData, school_id, listYear, key]);

  return (
    <LayoutBasePage title={<TitleSchoolRetrievePage />} tools={tools}>
      <TabsSchoolRetrievePage value={viewData} handleChange={handleChange} />
      {view}
      <Footer />
    </LayoutBasePage>
  );
};

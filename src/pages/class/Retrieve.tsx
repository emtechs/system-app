import { SyntheticEvent, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuthContext, useClassContext } from "../../shared/contexts";
import { LayoutBasePage } from "../../shared/layouts";
import {
  TabsClassRetrievePage,
  TitleClassRetrievePage,
  ToolsSchool,
} from "../../shared/components";
import {
  ViewClassData,
  ViewFrequency,
  ViewInfrequency,
  ViewSchool,
  ViewSchoolData,
  ViewStudent,
} from "../../shared/views";
import { useValueTabs } from "../../shared/hooks";

export const RetrieveClassPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { class_id } = useParams();
  const viewData = searchParams.get("view") || "";
  const { listYear, periods } = useAuthContext();
  const { classRetrieve, classDataRetrieve } = useClassContext();
  const [view, setView] = useState(<ViewSchoolData />);
  const [tools, setTools] = useState(<ToolsSchool back="/school" />);
  const { valueTabs } = useValueTabs(listYear?.at(0)?.id, periods?.at(0)?.id);

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams(valueTabs(newValue, "view"), { replace: true });
  };

  useEffect(() => {
    if (class_id) {
      if (classRetrieve?.id !== class_id) classDataRetrieve(class_id);
    }
  }, [class_id]);

  useEffect(() => {
    switch (viewData) {
      case "school":
        setView(<ViewSchool class_id={class_id} />);
        setTools(<ToolsSchool isDash back="/school" />);
        break;

      case "student":
        setView(<ViewStudent />);
        setTools(
          <ToolsSchool back="/school" isNew titleNew="Aluno" isDash isSearch />
        );
        break;

      case "frequency":
        setView(<ViewFrequency table_def="school" />);
        setTools(<ToolsSchool isDash back="/school" />);
        break;

      case "infrequency":
        setView(<ViewInfrequency />);
        setTools(<ToolsSchool isDash back="/school" />);
        break;

      default:
        setView(<ViewClassData />);
        setTools(<ToolsSchool isDash back="/school" />);
    }
  }, [viewData, listYear, class_id]);

  return (
    <LayoutBasePage title={<TitleClassRetrievePage />} tools={tools}>
      <TabsClassRetrievePage value={viewData} handleChange={handleChange} />
      {view}
    </LayoutBasePage>
  );
};

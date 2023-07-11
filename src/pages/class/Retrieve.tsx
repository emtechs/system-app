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

export const RetrieveClassPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { class_id } = useParams();
  const viewData = searchParams.get("view") || "";
  const { yearData } = useAuthContext();
  const { classRetrieve, classDataRetrieve, search, listYear, periods } =
    useClassContext();
  const [view, setView] = useState(<ViewSchoolData />);
  const [tools, setTools] = useState(<ToolsSchool back="/school" />);

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams(
      {
        view: newValue,
        year_id: yearData ? yearData.id : "",
        period: periods ? periods[0].id : "",
      },
      { replace: true }
    );
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
        setView(
          <ViewFrequency
            listYear={listYear}
            search={search}
            table_def="school"
          />
        );
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
  }, [viewData, search, listYear, class_id]);

  return (
    <LayoutBasePage title={<TitleClassRetrievePage />} tools={tools}>
      <TabsClassRetrievePage value={viewData} handleChange={handleChange} />
      {view}
    </LayoutBasePage>
  );
};

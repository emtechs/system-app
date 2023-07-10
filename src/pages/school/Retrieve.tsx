import { SyntheticEvent, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { PersonAdd } from "@mui/icons-material";
import { useAuthContext, useSchoolContext } from "../../shared/contexts";
import { LayoutBasePage } from "../../shared/layouts";
import {
  TabsSchoolRetrievePage,
  TitleSchoolRetrievePage,
  ToolsSchool,
} from "../../shared/components";
import {
  ViewClassYear,
  ViewFrequency,
  ViewInfrequency,
  ViewSchoolData,
  ViewStudent,
  ViewUser,
} from "../../shared/views";

export const RetrieveSchoolPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { school_id } = useParams();
  const viewData = searchParams.get("view") || "";
  const { yearData } = useAuthContext();
  const { schoolDataRetrieve, schoolRetrieve, search, listYear, periods } =
    useSchoolContext();
  const [view, setView] = useState(<ViewSchoolData />);
  const [tools, setTools] = useState(<ToolsSchool back="/school" />);

  useEffect(() => {
    if (school_id) {
      if (schoolRetrieve?.id !== school_id) schoolDataRetrieve(school_id);
    }
  }, [school_id]);

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
    switch (viewData) {
      case "server":
        setView(<ViewUser search={search} school_id={school_id} />);
        setTools(
          <ToolsSchool
            back="/school"
            iconNew={<PersonAdd />}
            isNew
            titleNew="Servidor"
            isSearch
            isDash
          />
        );
        break;

      case "class":
        setView(<ViewClassYear />);
        setTools(
          <ToolsSchool back="/school" isNew titleNew="Turma" isDash isSearch />
        );
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
            school_id={school_id}
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
        setView(<ViewSchoolData />);
        setTools(<ToolsSchool isDash back="/school" />);
    }
  }, [viewData, school_id, search, listYear]);

  return (
    <LayoutBasePage title={<TitleSchoolRetrievePage />} tools={tools}>
      <TabsSchoolRetrievePage value={viewData} handleChange={handleChange} />
      {view}
    </LayoutBasePage>
  );
};

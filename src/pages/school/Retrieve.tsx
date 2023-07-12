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
import { useValueTabs } from "../../shared/hooks";

export const RetrieveSchoolPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { school_id } = useParams();
  const viewData = searchParams.get("view") || "";
  const { listYear } = useAuthContext();
  const { verifySchool } = useSchoolContext();
  const [view, setView] = useState(<ViewSchoolData id={school_id} />);
  const [tools, setTools] = useState(<ToolsSchool back="/school" />);
  const { valueTabs } = useValueTabs(listYear?.at(0)?.id, "ANO");

  useEffect(() => {
    if (school_id) verifySchool(school_id);
  }, [school_id]);

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams(valueTabs(newValue, "view"), { replace: true });
  };

  useEffect(() => {
    switch (viewData) {
      case "server":
        setView(<ViewUser school_id={school_id} />);
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
        setView(<ViewFrequency school_id={school_id} table_def="school" />);
        setTools(<ToolsSchool isDash back="/school" />);
        break;

      case "infrequency":
        setView(<ViewInfrequency />);
        setTools(<ToolsSchool isDash back="/school" />);
        break;

      default:
        setView(<ViewSchoolData id={school_id} />);
        setTools(<ToolsSchool isDash back="/school" />);
    }
  }, [viewData, school_id, listYear]);

  return (
    <LayoutBasePage title={<TitleSchoolRetrievePage />} tools={tools}>
      <TabsSchoolRetrievePage value={viewData} handleChange={handleChange} />
      {view}
    </LayoutBasePage>
  );
};

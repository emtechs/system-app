import { SyntheticEvent, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { PersonAdd } from "@mui/icons-material";
import { useAuthContext } from "../../shared/contexts";
import { LayoutBasePage } from "../../shared/layouts";
import {
  Footer,
  TabsSchoolRetrievePage,
  TitleSchoolRetrievePage,
  ToolsSchool,
} from "../../shared/components";
import {
  ViewClass,
  ViewFrequency,
  ViewInfrequency,
  ViewSchoolData,
  ViewStudent,
  ViewUser,
} from "../../shared/views";
import { useValueTabs, useVerify } from "../../shared/hooks";

export const RetrieveSchoolPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { school_id } = useParams();
  const viewData = searchParams.get("view") || "";
  const year_id = searchParams.get("year_id") || undefined;
  const { listYear } = useAuthContext();
  const [view, setView] = useState(<ViewSchoolData id={school_id} />);
  const [tools, setTools] = useState(<ToolsSchool back="/school" />);
  const { valueTabs } = useValueTabs(listYear?.at(0)?.id, "ANO");
  const { verify } = useVerify();

  useEffect(() => {
    verify(year_id, school_id);
  }, [school_id, verify, year_id]);

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams(valueTabs(newValue, "view"), { replace: true });
  };

  useEffect(() => {
    switch (viewData) {
      case "server":
        setView(<ViewUser id={school_id} />);
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
        setView(<ViewClass id={school_id} />);
        setTools(
          <ToolsSchool back="/school" isNew titleNew="Turma" isDash isSearch />
        );
        break;

      case "student":
        setView(<ViewStudent id={school_id} />);
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
      <Footer />
    </LayoutBasePage>
  );
};

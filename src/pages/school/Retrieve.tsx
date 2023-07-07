import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Box, Breadcrumbs, Chip, Link, Tab, Tabs } from "@mui/material";
import {
  Checklist,
  Groups,
  Home,
  People,
  Percent,
  PersonAdd,
  School,
  Workspaces,
} from "@mui/icons-material";
import {
  useAppThemeContext,
  useAuthContext,
  usePaginationContext,
  useSchoolContext,
} from "../../shared/contexts";
import { LayoutBasePage } from "../../shared/layouts";
import { LabelSchool, ToolsSchool } from "../../shared/components";
import {
  ViewClass,
  ViewSchoolData,
  ViewStudent,
  ViewUser,
} from "../../shared/views";

export const RetrieveSchoolPage = () => {
  const [searchParams] = useSearchParams();
  const { school_id } = useParams();
  const viewData = searchParams.get("view");
  const { mdDown } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { schoolDataRetrieve, schoolRetrieve, search } = useSchoolContext();
  const { setOrder, setBy, setPage } = usePaginationContext();
  const [view, setView] = useState(<ViewSchoolData />);
  const [tools, setTools] = useState(<ToolsSchool back="/school" />);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (school_id) {
      if (schoolRetrieve?.id !== school_id) schoolDataRetrieve(school_id);
    }
  }, [school_id]);

  const handleView = () => {
    setPage(0);
    setOrder("name");
    setBy("asc");
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
          />
        );
        setValue(1);
        handleView();
        break;

      case "class":
        setView(<ViewClass />);
        setTools(
          <ToolsSchool back="/school" isNew titleNew="Turma" isSearch />
        );
        setValue(2);
        handleView();
        break;

      case "student":
        setView(<ViewStudent />);
        setTools(
          <ToolsSchool back="/school" isNew titleNew="Aluno" isSearch />
        );
        setValue(3);
        handleView();
        break;

      case "frequency":
        setView(<ViewSchoolData />);
        setTools(<ToolsSchool back="/school" />);
        setValue(4);
        handleView();
        break;

      case "infrequency":
        setView(<ViewSchoolData />);
        setTools(<ToolsSchool back="/school" />);
        setValue(5);
        handleView();
        break;

      default:
        setView(<ViewSchoolData />);
        setTools(<ToolsSchool back="/school" />);
        setValue(0);
    }
  }, [viewData, school_id, search]);

  return (
    <LayoutBasePage
      title={
        <Breadcrumbs maxItems={mdDown ? 2 : undefined} aria-label="breadcrumb">
          <Link underline="none" color="inherit" href="/">
            <Chip
              clickable
              color="primary"
              variant="outlined"
              label={mdDown ? "..." : "Página Inicial"}
              icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </Link>
          <Link underline="none" color="inherit" href="/school">
            <Chip
              clickable
              color="primary"
              variant="outlined"
              label={mdDown ? "..." : "Escolas"}
              icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </Link>
          <LabelSchool school={schoolRetrieve} />
        </Breadcrumbs>
      }
      tools={tools}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} variant="scrollable" scrollButtons="auto">
          <Tab href={"/school/" + school_id} icon={<School />} label="Escola" />
          <Tab
            href={"/school/" + school_id + "?view=server"}
            icon={<People />}
            label="Servidores"
          />
          <Tab
            href={
              "/school/" + school_id + "?view=class&year_id=" + yearData?.id
            }
            icon={<Workspaces />}
            label="Turmas"
          />
          <Tab
            href={
              "/school/" + school_id + "?view=student&year_id=" + yearData?.id
            }
            icon={<Groups />}
            label="Alunos"
            disabled={schoolRetrieve?.is_dash ? false : true}
          />
          <Tab
            href={"/school/" + school_id + "?view=frequency"}
            icon={<Checklist />}
            label="Frequências"
            disabled={schoolRetrieve?.is_dash ? false : true}
          />
          <Tab
            href={"/school/" + school_id + "?view=infrequency"}
            icon={<Percent />}
            label="Infrequência"
            disabled={schoolRetrieve?.is_dash ? false : true}
          />
        </Tabs>
      </Box>
      {view}
    </LayoutBasePage>
  );
};

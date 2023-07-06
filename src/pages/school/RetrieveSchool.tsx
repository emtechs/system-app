import { useEffect, useMemo } from "react";
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
import { ViewSchoolClass, ViewSchoolData, ViewSchoolServer } from "./view";

export const RetrieveSchoolPage = () => {
  const [searchParams] = useSearchParams();
  const { school_id } = useParams();
  const viewData = searchParams.get("view");
  const { mdDown } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { schoolDataRetrieve, schoolRetrieve } = useSchoolContext();
  const { setOrder, setBy, setPage } = usePaginationContext();

  const handleView = () => {
    setPage(0);
    setOrder("name");
    setBy("asc");
  };

  const value = useMemo(() => {
    switch (viewData) {
      case "server":
        handleView();
        return 1;
      case "class":
        handleView();
        return 2;
      case "student":
        handleView();
        return 3;
      case "frequency":
        handleView();
        return 4;
      case "infrequency":
        handleView();
        return 5;
      default:
        return 0;
    }
  }, [viewData]);

  useEffect(() => {
    if (school_id && yearData) {
      if (schoolRetrieve?.id !== school_id)
        schoolDataRetrieve(school_id, `?year_id=${yearData.id}`);
    }
  }, [school_id, yearData]);

  const tools = [
    <ToolsSchool back="/school" />,
    <ToolsSchool
      back="/school"
      iconNew={<PersonAdd />}
      isNew
      titleNew="Servidor"
      isSearch
    />,
    <ToolsSchool back="/school" isNew titleNew="Turma" isSearch />,
  ];

  const view = [<ViewSchoolData />, <ViewSchoolServer />, <ViewSchoolClass />];

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
      tools={tools[value]}
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
            href={"/school/" + school_id + "?view=student"}
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
      {view[value]}
    </LayoutBasePage>
  );
};

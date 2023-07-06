import { useCallback, useEffect } from "react";
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
  useSchoolContext,
} from "../../shared/contexts";
import { LayoutBasePage } from "../../shared/layouts";
import { LabelSchool, ToolsSchool } from "../../shared/components";
import { ViewSchoolData, ViewSchoolServer } from "./view";

export const RetrieveSchoolPage = () => {
  const [searchParams] = useSearchParams();
  const { school_id } = useParams();
  const viewData = searchParams.get("view");
  const { mdDown } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { schoolDataRetrieve, schoolRetrieve } = useSchoolContext();

  const defineValue = useCallback(() => {
    let value = 0;

    if (viewData === "server") value = 1;

    if (viewData === "class") value = 2;

    if (viewData === "student") value = 3;

    if (viewData === "frequency") value = 4;

    if (viewData === "infrequency") value = 5;

    return value;
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

  const view = [<ViewSchoolData />, <ViewSchoolServer />];

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
      tools={tools[defineValue()]}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={defineValue()} variant="scrollable" scrollButtons="auto">
          <Tab href={"/school/" + school_id} icon={<School />} label="Escola" />
          <Tab
            href={"/school/" + school_id + "?view=server"}
            icon={<People />}
            label="Servidores"
          />
          <Tab
            href={"/school/" + school_id + "?view=class"}
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
      {view[defineValue()]}
    </LayoutBasePage>
  );
};

import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Box, Breadcrumbs, Chip, Link, Tab, Tabs } from "@mui/material";
import {
  Checklist,
  Groups,
  Home,
  Percent,
  School,
  Workspaces,
} from "@mui/icons-material";
import {
  useAppThemeContext,
  useAuthContext,
  useClassContext,
} from "../../shared/contexts";
import { LayoutBasePage } from "../../shared/layouts";
import { LabelClass, ToolsSchool } from "../../shared/components";
import {
  ViewClassData,
  ViewFrequency,
  ViewInfrequency,
  ViewSchoolData,
  ViewStudent,
} from "../../shared/views";

export const RetrieveClassPage = () => {
  const [searchParams] = useSearchParams();
  const { class_id } = useParams();
  const viewData = searchParams.get("view");
  const { mdDown } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { classRetrieve, classDataRetrieve, search, listYear, periods } =
    useClassContext();
  const [view, setView] = useState(<ViewSchoolData />);
  const [tools, setTools] = useState(<ToolsSchool back="/school" />);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (class_id) {
      if (classRetrieve?.id !== class_id) classDataRetrieve(class_id);
    }
  }, [class_id]);

  useEffect(() => {
    switch (viewData) {
      case "student":
        setView(<ViewStudent />);
        setTools(
          <ToolsSchool back="/school" isNew titleNew="Aluno" isDash isSearch />
        );
        setValue(3);
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
        setValue(4);
        break;

      case "infrequency":
        setView(<ViewInfrequency />);
        setTools(<ToolsSchool isDash back="/school" />);
        setValue(5);
        break;

      default:
        setView(<ViewClassData />);
        setTools(<ToolsSchool isDash back="/school" />);
        setValue(0);
    }
  }, [viewData, search, listYear]);

  const href = useCallback(
    (view?: string, isYear?: boolean, isPeriod?: boolean) => {
      let href_base = `/class/${class_id}`;

      if (view) href_base += `?view=${view}`;

      if (isYear) href_base += `&year_id=${yearData?.id}`;

      if (isPeriod && periods) href_base += `&period=${periods[0].id}`;

      return href_base;
    },
    [class_id, periods, yearData]
  );

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
              label={mdDown ? "..." : "Turmas"}
              icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </Link>
          <LabelClass classData={classRetrieve} />
        </Breadcrumbs>
      }
      tools={tools}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} variant="scrollable" scrollButtons="auto">
          <Tab href={href()} icon={<Workspaces />} label="Turma" />
          <Tab href={href("class", true)} icon={<School />} label="Escolas" />
          <Tab
            href={href("student", true)}
            icon={<Groups />}
            label="Alunos"
            disabled={classRetrieve?.schools === 0}
          />
          <Tab
            href={href("frequency", true)}
            icon={<Checklist />}
            label="Frequências"
            disabled={classRetrieve?.schools === 0}
          />
          <Tab
            href={href("infrequency", true, true)}
            icon={<Percent />}
            label="Infrequência"
            disabled={classRetrieve?.schools === 0}
          />
        </Tabs>
      </Box>
      {view}
    </LayoutBasePage>
  );
};

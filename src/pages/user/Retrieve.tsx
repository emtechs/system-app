import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import { Checklist, History, Person, School } from "@mui/icons-material";
import {
  useAuthContext,
  useSchoolContext,
  useUserContext,
} from "../../shared/contexts";
import { LayoutBasePage } from "../../shared/layouts";
import { TitleServer, TitleUser, ToolsUser } from "../../shared/components";
import {
  ViewFrequency,
  ViewFrequencyHistory,
  ViewSchool,
  ViewUserData,
} from "../../shared/views";

export const RetrieveUserPage = () => {
  const [searchParams] = useSearchParams();
  const { user_id } = useParams();
  const viewData = searchParams.get("view");
  const school_id = searchParams.get("school_id") || undefined;
  const { yearData } = useAuthContext();
  const { userDataRetrieve, userRetrieve, search, listYear } = useUserContext();
  const { schoolDataRetrieve } = useSchoolContext();
  const [view, setView] = useState(<ViewUserData />);
  const [tools, setTools] = useState(<ToolsUser back="/user" />);
  const [value, setValue] = useState(0);

  const href = useCallback(
    (view?: string, isYear?: boolean) => {
      let href_data = `/user/${user_id}?view=`;
      if (school_id)
        href_data = `/user/${user_id}?school_id=${school_id}&view=`;
      if (view) href_data += view;
      if (isYear) href_data += `&year_id=${yearData?.id}`;
      return href_data;
    },
    [user_id, school_id, yearData]
  );

  const back = useMemo(() => {
    if (school_id) return `/school/${school_id}`;
    return "/user";
  }, [school_id]);

  useEffect(() => {
    if (user_id) {
      if (userRetrieve?.id !== user_id) userDataRetrieve(user_id);
    }
    if (school_id) schoolDataRetrieve(school_id);
  }, [school_id, user_id]);

  const title = useMemo(() => {
    if (school_id) return <TitleServer />;
    return <TitleUser />;
  }, [school_id]);

  useEffect(() => {
    switch (viewData) {
      case "school":
        setView(
          <ViewSchool
            search={search}
            server_id={user_id}
            school_id={school_id}
          />
        );
        setTools(<ToolsUser back={back} isNew titleNew="Nova" isSearch />);
        setValue(1);
        break;

      case "frequency":
        setView(
          <ViewFrequency
            user_id={user_id}
            listYear={listYear}
            school_id={school_id ? school_id : undefined}
            search={search}
            table_def={school_id ? "school" : "user"}
          />
        );
        setTools(<ToolsUser back={back} />);
        setValue(2);
        break;

      case "history":
        setView(<ViewFrequencyHistory />);
        setTools(<ToolsUser back={back} />);
        setValue(3);
        break;

      default:
        setView(<ViewUserData />);
        setTools(<ToolsUser back={back} />);
        setValue(0);
    }
  }, [viewData, search, school_id, user_id, back, listYear]);

  return (
    <LayoutBasePage title={title} tools={tools}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} variant="scrollable" scrollButtons="auto">
          <Tab href={href()} icon={<Person />} label="Usuário" />
          <Tab
            href={href("school")}
            icon={<School />}
            label="Escolas"
            disabled={userRetrieve?.role === "ADMIN" ? true : false}
          />
          <Tab
            href={href("frequency", true)}
            icon={<Checklist />}
            label="Frequências"
          />
          <Tab
            href={href("history", true)}
            icon={<History />}
            label="Histórico"
          />
        </Tabs>
      </Box>
      {view}
    </LayoutBasePage>
  );
};

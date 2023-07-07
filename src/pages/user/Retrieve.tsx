import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import { Checklist, Person, School } from "@mui/icons-material";
import { usePaginationContext, useUserContext } from "../../shared/contexts";
import { LayoutBasePage } from "../../shared/layouts";
import { TitleServer, TitleUser, ToolsUser } from "../../shared/components";
import { ViewSchool, ViewUserData } from "../../shared/views";

export const RetrieveUserPage = () => {
  const [searchParams] = useSearchParams();
  const { user_id } = useParams();
  const viewData = searchParams.get("view");
  const school_id = searchParams.get("school_id");
  const { userDataRetrieve, userRetrieve, search } = useUserContext();
  const { setOrder, setBy, setPage } = usePaginationContext();
  const [view, setView] = useState(<ViewUserData />);
  const [tools, setTools] = useState(<ToolsUser back="/user" />);
  const [value, setValue] = useState(0);

  const href = useMemo(() => {
    if (school_id) return `/user/${user_id}?school_id=${school_id}&view=`;
    return `/user/${user_id}?view=`;
  }, [user_id, school_id]);

  const back = useMemo(() => {
    if (school_id) return `/school/${school_id}`;
    return "/user";
  }, [school_id]);

  useEffect(() => {
    if (user_id) {
      if (userRetrieve?.id !== user_id) userDataRetrieve(user_id);
    }
  }, [user_id]);

  const handleView = () => {
    setPage(0);
    setOrder("name");
    setBy("asc");
  };

  const title = useMemo(() => {
    if (school_id) return <TitleServer />;
    return <TitleUser />;
  }, [school_id]);

  useEffect(() => {
    switch (viewData) {
      case "school":
        setView(<ViewSchool search={search} server_id={user_id} />);
        setTools(<ToolsUser back={back} isSearch />);
        setValue(1);
        handleView();
        break;

      case "frequency":
        setView(<ViewUserData />);
        setTools(<ToolsUser back={back} />);
        setValue(2);
        handleView();
        break;

      default:
        setView(<ViewUserData />);
        setTools(<ToolsUser back={back} />);
        setValue(0);
    }
  }, [viewData, search, school_id, user_id, back]);

  return (
    <LayoutBasePage title={title} tools={tools}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} variant="scrollable" scrollButtons="auto">
          <Tab href={href} icon={<Person />} label="Usuário" />
          <Tab
            href={href + "school"}
            icon={<School />}
            label="Escolas"
            disabled={userRetrieve?.role === "ADMIN" ? true : false}
          />
          <Tab
            href={href + "frequency"}
            icon={<Checklist />}
            label="Frequências"
          />
        </Tabs>
      </Box>
      {view}
    </LayoutBasePage>
  );
};

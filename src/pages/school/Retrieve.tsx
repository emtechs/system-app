import { useCallback, useEffect, useState } from "react";
import {
  useAppThemeContext,
  useAuthContext,
  usePaginationContext,
  useSchoolContext,
} from "../../shared/contexts";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import { TableServer } from "./components/table";
import {
  CreateServer,
  DialogActiveSchool,
  Director,
  Edit,
  TitleRetrieveSchool,
  ToolsRetrieveSchool,
  ToolsRetrieveSchoolServers,
  ViewRetrieveSchool,
} from "./components";
import { useParams } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import {
  Checklist,
  Groups,
  People,
  School,
  Workspaces,
} from "@mui/icons-material";

export const RetrieveSchoolPage = () => {
  const { school_id } = useParams();
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { schoolData } = useAuthContext();
  const { defineQuery, query } = usePaginationContext();
  const {
    serversData,
    getServers,
    schoolDataRetrieve,
    schoolDataAdminRetrieve,
  } = useSchoolContext();
  const [search, setSearch] = useState<string>();
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (school_id) {
      schoolDataRetrieve(school_id);
      schoolDataAdminRetrieve(school_id);
    }
  }, [school_id]);

  const queryData = useCallback(
    (take: number) => {
      let query_data = defineQuery();
      if (mdDown) {
        query_data = query(take);
        return query_data;
      }
      return query_data;
    },
    [defineQuery, query, mdDown]
  );

  useEffect(() => {
    if (school_id) {
      const take = 5;
      let query = queryData(take);
      if (search) {
        query += `&name=${search}`;
        debounce(() => {
          getServers(school_id, query, take);
        });
      } else {
        getServers(school_id, query, take);
      }
    }
  }, [school_id, queryData, search]);

  const tools = [
    <ToolsRetrieveSchool />,
    <ToolsRetrieveSchoolServers
      search={search}
      setSearch={(text) => setSearch(text)}
    />,
  ];

  const views = [
    <ViewRetrieveSchool />,
    <TableServer
      school_id={school_id ? school_id : ""}
      servers={serversData}
    />,
  ];

  return (
    <>
      <LayoutBasePage title={<TitleRetrieveSchool />} tools={tools[value]}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<School />} label="Escola" />
            <Tab icon={<People />} label="Servidores" />
            <Tab icon={<Workspaces />} label="Turmas" />
            <Tab icon={<Groups />} label="Alunos" />
            <Tab icon={<Checklist />} label="Frequências" />
          </Tabs>
        </Box>
        {views[value]}
      </LayoutBasePage>
      {schoolData && <DialogActiveSchool school={schoolData} />}
      {schoolData && <CreateServer school={schoolData} />}
      {schoolData && <Edit school={schoolData} />}
      {schoolData && <Director school={schoolData} />}
    </>
  );
};

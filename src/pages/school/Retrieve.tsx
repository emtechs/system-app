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
  ToolsRetrieveSchoolClasses,
  ToolsRetrieveSchoolServers,
  ViewRetrieveSchool,
} from "./components";
import { useParams } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import {
  Checklist,
  Groups,
  People,
  Percent,
  School,
  Workspaces,
} from "@mui/icons-material";
import { iYear } from "../../shared/interfaces";

export const RetrieveSchoolPage = () => {
  const { school_id } = useParams();
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { schoolData, yearData } = useAuthContext();
  const { defineQuery, query } = usePaginationContext();
  const { serversData, getServers, schoolDataRetrieve, disabled, listYear } =
    useSchoolContext();
  const [search, setSearch] = useState<string>();
  const [value, setValue] = useState(0);
  const [valueVert, setValueVert] = useState(0);
  const [years, setYears] = useState<iYear[]>();
  const [openActive, setOpenActive] = useState(false);
  const [openCreateClass, setOpenCreateClass] = useState(false);
  const [openCreateServer, setOpenCreateServer] = useState(false);
  const [openDirector, setOpenDirector] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenActive = () => setOpenActive(!openActive);
  const handleOpenCreateClass = () => setOpenCreateClass(!openCreateClass);
  const handleOpenCreateServer = () => setOpenCreateServer(!openCreateServer);
  const handleOpenDirector = () => setOpenDirector(!openDirector);
  const handleOpenEdit = () => setOpenEdit(!openEdit);

  useEffect(() => {
    if (disabled && yearData) {
      setYears([yearData]);
    } else if (listYear) setYears(listYear);
  }, [yearData, listYear, disabled]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeVert = (_event: React.SyntheticEvent, newValue: number) => {
    setValueVert(newValue);
  };

  useEffect(() => {
    if (school_id) schoolDataRetrieve(school_id);
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
      onClickNew={handleOpenCreateServer}
    />,
    <ToolsRetrieveSchoolClasses
      search={search}
      setSearch={(text) => setSearch(text)}
      year={years ? years[valueVert] : undefined}
      onClickNew={handleOpenCreateClass}
    />,
  ];

  const views = [
    <ViewRetrieveSchool
      handleOpenActive={handleOpenActive}
      handleOpenDirector={handleOpenDirector}
      handleOpenEdit={handleOpenEdit}
    />,
    <TableServer
      school_id={school_id ? school_id : ""}
      servers={serversData}
    />,
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={valueVert}
        onChange={handleChangeVert}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {years?.map((el) => (
          <Tab key={el.id} label={el.year} />
        ))}
      </Tabs>
    </Box>,
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
            <Tab icon={<Groups />} label="Alunos" disabled={disabled} />
            <Tab icon={<Checklist />} label="Frequências" disabled={disabled} />
            <Tab icon={<Percent />} label="Infrequência" disabled={disabled} />
          </Tabs>
        </Box>
        {views[value]}
      </LayoutBasePage>
      {schoolData && (
        <DialogActiveSchool
          onClose={handleOpenActive}
          open={openActive}
          school={schoolData}
        />
      )}
      {schoolData && (
        <CreateServer
          onClose={handleOpenCreateServer}
          open={openCreateServer}
          school={schoolData}
        />
      )}
      {schoolData && (
        <Edit onClose={handleOpenEdit} open={openEdit} school={schoolData} />
      )}
      {schoolData && (
        <Director
          open={openDirector}
          onClose={handleOpenDirector}
          school={schoolData}
        />
      )}
    </>
  );
};

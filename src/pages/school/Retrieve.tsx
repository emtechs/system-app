import { Breadcrumbs, Button, Chip, IconButton, Tooltip } from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
  usePaginationContext,
  useSchoolContext,
} from "../../shared/contexts";
import { useCallback, useEffect, useState } from "react";
import { iheadCell } from "../../shared/interfaces";
import { Home, PersonAdd, RemoveDone, School } from "@mui/icons-material";
import {
  LinkRouter,
  Pagination,
  TableBase,
  Tools,
} from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import { Active, CardServer, CreateServer, Director, Edit } from "./components";

interface iRetrieveSchoolPageProps {
  id: string;
}

export const RetrieveSchoolPage = ({ id }: iRetrieveSchoolPageProps) => {
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { schoolData } = useAuthContext();
  const { defineQuery, query } = usePaginationContext();
  const {
    labelSchool,
    serversData,
    getServers,
    handleOpenActive,
    handleOpenCreate,
  } = useSchoolContext();
  const { handleClickButtonTools } = useDrawerContext();
  const [search, setSearch] = useState<string>();

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
    const take = 5;
    let query = queryData(take);
    if (search) {
      query += `&name=${search}`;
      debounce(() => {
        getServers(id, query, take);
      });
    } else {
      getServers(id, query, take);
    }
  }, [queryData, search]);

  const headCells: iheadCell[] = mdDown
    ? [
        { order: "name", numeric: false, label: "Nome Completo" },
        { numeric: false, label: "CPF" },
      ]
    : [
        { order: "name", numeric: false, label: "Nome Completo" },
        { numeric: false, label: "CPF" },
        { numeric: false, label: "Função" },
        { numeric: false, label: "Tela" },
      ];

  return (
    <>
      <LayoutBasePage
        title={
          <Breadcrumbs
            maxItems={mdDown ? 2 : undefined}
            aria-label="breadcrumb"
          >
            <LinkRouter
              underline="none"
              color="inherit"
              to="/"
              onClick={handleClickButtonTools}
            >
              <Chip
                clickable
                color="primary"
                variant="outlined"
                label={mdDown ? "..." : "Página Inicial"}
                icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
              />
            </LinkRouter>
            <LinkRouter underline="none" color="inherit" to="/school">
              <Chip
                clickable
                color="primary"
                variant="outlined"
                label={mdDown ? "..." : "Escolas"}
                icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
              />
            </LinkRouter>
            <Chip
              label={labelSchool()}
              color="primary"
              icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </Breadcrumbs>
        }
        tools={
          <Tools
            back="/school"
            isNew
            iconNew={<PersonAdd />}
            onClickNew={handleOpenCreate}
            titleNew="Servidor"
            isSchool
            isSearch
            search={search}
            setSearch={(text) => setSearch(text)}
            finish={
              mdDown ? (
                <Tooltip title="Desativar">
                  <IconButton color="error" onClick={handleOpenActive}>
                    <RemoveDone />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  disableElevation
                  onClick={handleOpenActive}
                  endIcon={<RemoveDone />}
                >
                  Desativar
                </Button>
              )
            }
          />
        }
      >
        <TableBase
          headCells={headCells}
          is_pagination={mdDown ? false : undefined}
        >
          {serversData?.map((el) => (
            <CardServer key={el.server.id} school_id={id} schoolServer={el} />
          ))}
        </TableBase>
        {mdDown && <Pagination />}
      </LayoutBasePage>
      {schoolData && <CreateServer school={schoolData} />}
      {schoolData && <Active school={schoolData} />}
      {schoolData && <Edit school={schoolData} />}
      {schoolData && <Director school={schoolData} />}
    </>
  );
};

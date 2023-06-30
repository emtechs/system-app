import { Breadcrumbs, Button, Chip, IconButton, Tooltip } from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
  usePaginationContext,
  useSchoolContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iheadCell } from "../../shared/interfaces";
import { Home, PersonAdd, RemoveDone, School } from "@mui/icons-material";
import { LinkRouter, TableBase, Tools } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import { Active, CardServer, Director, Edit } from "./components";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Nome Completo" },
  { numeric: false, label: "CPF" },
  { numeric: false, label: "Função" },
  { numeric: false, label: "Tela" },
];

interface iRetrieveSchoolPageProps {
  id: string;
}

export const RetrieveSchoolPage = ({ id }: iRetrieveSchoolPageProps) => {
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { schoolData } = useAuthContext();
  const { defineQuery } = usePaginationContext();
  const { labelSchool, serversData, getServers, handleOpenActive } =
    useSchoolContext();
  const { handleClickButtonTools } = useDrawerContext();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    let query = defineQuery();
    if (search) {
      query += `&name=${search}`;
      debounce(() => {
        getServers(id, query);
      });
    } else {
      getServers(id, query);
    }
  }, [defineQuery, search]);

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
                label="Página Inicial"
                icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
              />
            </LinkRouter>
            <LinkRouter underline="none" color="inherit" to="/school">
              <Chip
                clickable
                color="primary"
                variant="outlined"
                label="Escolas"
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
            isHome
            isNew
            iconNew={<PersonAdd />}
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
        <TableBase headCells={headCells}>
          {serversData?.map((el) => (
            <CardServer key={el.server.id} school_id={id} schoolServer={el} />
          ))}
        </TableBase>
      </LayoutBasePage>
      {schoolData && <Active school={schoolData} />}
      {schoolData && <Edit school={schoolData} />}
      {schoolData && <Director school={schoolData} />}
    </>
  );
};

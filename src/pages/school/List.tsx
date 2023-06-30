import { useEffect, useState } from "react";
import { Breadcrumbs, Chip } from "@mui/material";
import { LinkRouter, TableBase, Tools } from "../../shared/components";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
  usePaginationContext,
  useSchoolContext,
} from "../../shared/contexts";
import { iheadCell } from "../../shared/interfaces";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import { Home, School } from "@mui/icons-material";
import { CardSchool, Create } from "./components";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Escola" },
  { order: "director_name", numeric: false, label: "Diretor" },
];

export const ListSchoolPage = () => {
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const {
    is_director,
    setDirector,
    handleOpenCreate,
    listSchoolData,
    getSchool,
  } = useSchoolContext();
  const { defineQuery, setActive } = usePaginationContext();
  const { handleClickButtonTools } = useDrawerContext();

  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (yearData) {
      let query = defineQuery() + is_director();
      if (search) {
        query += `&name=${search}`;
        debounce(() => {
          getSchool(query);
        });
      } else getSchool(query);
    }
  }, [yearData, defineQuery, is_director, search]);

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
            <Chip
              label="Escolas"
              color="primary"
              icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </Breadcrumbs>
        }
        tools={
          <Tools
            isHome
            isNew
            onClickNew={handleOpenCreate}
            isSearch
            search={search}
            setSearch={(text) => setSearch(text)}
            isDirector
            isActive
            titleNew="Nova"
            onClickReset={() => {
              setSearch(undefined);
              setDirector([true, true]);
              setActive(true);
            }}
          />
        }
      >
        <TableBase headCells={headCells} message="Nenhuma escola encotrada">
          {listSchoolData?.map((el) => (
            <CardSchool key={el.id} school={el} />
          ))}
        </TableBase>
      </LayoutBasePage>
      <Create />
    </>
  );
};

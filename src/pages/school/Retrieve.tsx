import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
  usePaginationContext,
  useSchoolContext,
} from "../../shared/contexts";
import { useCallback, useEffect, useState } from "react";
import { iSchoolServer, iheadCell } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { RemoveDone, School } from "@mui/icons-material";
import {
  TableBase,
  TitleSchoolAdminPages,
  Tools,
} from "../../shared/components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { rolePtBr } from "../../shared/scripts";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Nome Completo" },
  { numeric: false, label: "CPF" },
  { numeric: false, label: "Função" },
  { numeric: false, label: "Tela" },
];

interface iCardServerProps {
  school_id: string;
  schoolServer: iSchoolServer;
}
const CardServer = ({ school_id, schoolServer }: iCardServerProps) => {
  const navigate = useNavigate();
  const { handleClickUser } = useDrawerContext();
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => {
        handleClickUser();
        navigate(
          `/user?id=${schoolServer.server.id}&school_id=${school_id}&order=name`
        );
      }}
    >
      <TableCell>{schoolServer.server.name}</TableCell>
      <TableCell>{schoolServer.server.cpf}</TableCell>
      <TableCell>{rolePtBr(schoolServer.role)}</TableCell>
      <TableCell>
        {schoolServer.dash === "SCHOOL" ? "Escola" : "Frequência"}
      </TableCell>
    </TableRow>
  );
};

export const RetrieveSchoolPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { debounce } = useDebounce();
  const { schoolData } = useAuthContext();
  const { mdDown } = useAppThemeContext();
  const { updateSchool, schoolSelect, labelSchool, schoolRetrieve } =
    useSchoolContext();
  const { setIsLoading, setCount, defineQuery } = usePaginationContext();
  const [serversData, setServersData] = useState<iSchoolServer[]>();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>();
  const handleClose = () => {
    setOpen((oldOpen) => !oldOpen);
  };
  let school_id = "";
  if (id) {
    school_id = id;
  } else if (schoolData) school_id = schoolData.id;

  const getServers = useCallback((school_id: string, query: string) => {
    setIsLoading(true);
    apiUsingNow
      .get<{ total: number; result: iSchoolServer[] }>(
        `schools/${school_id}/server${query}`
      )
      .then((res) => {
        setServersData(res.data.result);
        setCount(res.data.total);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (id) schoolRetrieve(id);
  }, [id]);

  useEffect(() => {
    if (school_id) {
      let query = defineQuery() + "&is_active=true";
      if (search) {
        query += `&name=${search}`;
        debounce(() => {
          getServers(school_id, query);
        });
      } else {
        getServers(school_id, query);
      }
    }
  }, [school_id, defineQuery, search]);

  return (
    <>
      <LayoutBasePage
        title={
          <TitleSchoolAdminPages
            breadcrumbs={[
              <Chip
                label={labelSchool()}
                color="primary"
                icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
              />,
            ]}
          />
        }
        tools={
          <Tools
            back="/school/list"
            isHome
            school_id={school_id}
            isSearch
            search={search}
            setSearch={(text) => setSearch(text)}
            finish={
              mdDown ? (
                <Tooltip title="Desativar">
                  <IconButton color="error" onClick={handleClose}>
                    <RemoveDone />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  disableElevation
                  onClick={handleClose}
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
            <CardServer
              key={el.server.id}
              school_id={school_id}
              schoolServer={el}
            />
          ))}
        </TableBase>
      </LayoutBasePage>
      {schoolSelect && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Desativar Escola</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deseja continuar desativando a escola{" "}
              {schoolSelect.name.toUpperCase()}?
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                onClick={() => {
                  updateSchool(
                    {
                      is_active: false,
                    },
                    schoolSelect.id,
                    "estado",
                    "/school/list"
                  );
                  setOpen(false);
                }}
              >
                Continuar
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

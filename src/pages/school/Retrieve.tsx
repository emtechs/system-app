import {
  Button,
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
  useDrawerContext,
  useSchoolContext,
  useTableContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iSchoolServer, iheadCell } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { RemoveDone } from "@mui/icons-material";
import { TableBase, Tools } from "../../shared/components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { rolePtBr } from "../../shared/scripts";
import { LayoutSchoolPage } from "./Layout";
import { useDebounce } from "../../shared/hooks";

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
  const orderData = searchParams.get("order");
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { updateSchool, schoolSelect } = useSchoolContext();
  const { setIsLoading, by, order, take, skip, setCount, setOrder } =
    useTableContext();
  const [serversData, setServersData] = useState<iSchoolServer[]>();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>();
  const handleClose = () => {
    setOpen((oldOpen) => !oldOpen);
  };
  let school_id = "";
  if (id) {
    school_id = id;
  } else if (schoolSelect) school_id = schoolSelect.id;

  useEffect(() => {
    if (school_id) {
      let query = `?by=${by}&is_active=true`;
      if (order) {
        query += `&order=${order}`;
      } else if (orderData) {
        setOrder(orderData);
        query += `&order=${orderData}`;
      }
      if (take) query += `&take=${take}`;
      if (skip) query += `&skip=${skip}`;
      if (search) {
        query += `&name=${search}`;
        setIsLoading(true);
        debounce(() => {
          apiUsingNow
            .get<{ total: number; result: iSchoolServer[] }>(
              `schools/${school_id}/server${query}`
            )
            .then((res) => {
              setServersData(res.data.result);
              setCount(res.data.total);
            })
            .finally(() => setIsLoading(false));
        });
      } else {
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
      }
    }
  }, [school_id, take, skip, order, by, search]);

  return (
    <>
      <LayoutSchoolPage
        title="Listagem de Servidores da Escola"
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
        isSchool
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
      </LayoutSchoolPage>
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

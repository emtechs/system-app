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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  useAuthContext,
  useSchoolContext,
  useTableContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import {
  iDash,
  iDirector,
  iRole,
  iSchoolRetrieve,
  iheadCell,
} from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { RemoveDone } from "@mui/icons-material";
import { TableBase, Tools } from "../../shared/components";
import { useNavigate, useParams } from "react-router-dom";
import { rolePtBr } from "../../shared/scripts";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Nome Completo" },
  { numeric: false, label: "CPF" },
  { numeric: false, label: "Função" },
  { numeric: false, label: "Tela" },
];

interface iCardServerProps {
  school_id: string;
  server: iDirector;
  role: iRole;
  dash: iDash;
}
const CardServer = ({ school_id, server, role, dash }: iCardServerProps) => {
  const navigate = useNavigate();
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => {
        navigate(`/user/list/${server.id}?school_id=${school_id}`);
      }}
    >
      <TableCell>{server.name}</TableCell>
      <TableCell>{server.cpf}</TableCell>
      <TableCell>{rolePtBr(role)}</TableCell>
      <TableCell>{dash === "SCHOOL" ? "Escola" : "Frequência"}</TableCell>
    </TableRow>
  );
};

export const RetrieveSchoolPage = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { id } = useParams<"id">();
  const { yearId } = useAuthContext();
  const { updateSchool } = useSchoolContext();
  const { setIsLoading } = useTableContext();
  const [retrieveSchool, setRetrieveSchool] = useState<iSchoolRetrieve>();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen((oldOpen) => !oldOpen);
  };

  useEffect(() => {
    setIsLoading(true);
    apiUsingNow
      .get<iSchoolRetrieve>(
        `schools/${id}?is_listSchool=true&year_id=${yearId}`
      )
      .then((res) => setRetrieveSchool(res.data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <LayoutBasePage
        title={
          retrieveSchool?.name
            ? retrieveSchool.name
            : "Listagem de Servidores da Escola"
        }
        tools={
          <Tools
            back="/school/list"
            school_id={retrieveSchool?.id}
            isHome
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
          {retrieveSchool?.servers.map((el) => (
            <CardServer
              key={el.server.id}
              school_id={id ? id : ""}
              server={el.server}
              role={el.role}
              dash={el.dash}
            />
          ))}
        </TableBase>
      </LayoutBasePage>
      {retrieveSchool && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Desativar Escola</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deseja continuar desativando a escola{" "}
              {retrieveSchool.name.toUpperCase()}?
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                onClick={() => {
                  updateSchool(
                    {
                      is_active: false,
                    },
                    retrieveSchool.id,
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

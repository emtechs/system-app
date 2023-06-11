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
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useSchoolContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iDirector, iRole, iSchoolRetrieve } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { RemoveDone } from "@mui/icons-material";
import { TableUser, Tools } from "../../shared/components";
import { useNavigate, useParams } from "react-router-dom";
import { rolePtBr } from "../../shared/scripts";

interface iCardServerProps {
  school: iSchoolRetrieve;
  server: iDirector;
  role: iRole;
}
const CardServer = ({ school, server, role }: iCardServerProps) => {
  const navigate = useNavigate();
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => {
        navigate(`/user/list/${server.id}?school_id=${school.id}`);
      }}
    >
      <TableCell>{server.name}</TableCell>
      <TableCell>{server.cpf}</TableCell>
      <TableCell>{rolePtBr(role)}</TableCell>
    </TableRow>
  );
};

export const RetrieveSchoolPage = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { id } = useParams<"id">();
  const { setLoading } = useAppThemeContext();
  const { yearId } = useAuthContext();
  const { updateSchool } = useSchoolContext();
  const [retrieveSchool, setRetrieveSchool] = useState<iSchoolRetrieve>();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen((oldOpen) => !oldOpen);
  };

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iSchoolRetrieve>(
        `schools/${id}?is_listSchool=true&year_id=${yearId}`
      )
      .then((res) => setRetrieveSchool(res.data))
      .finally(() => setLoading(false));
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
            isBack
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
        {retrieveSchool && retrieveSchool.servers.length > 0 ? (
          <TableUser>
            <>
              {retrieveSchool.servers.map((el) => (
                <CardServer
                  key={el.server.id}
                  school={retrieveSchool}
                  server={el.server}
                  role={el.role}
                />
              ))}
            </>
          </TableUser>
        ) : (
          <Typography m={2}>Escola sem servidores no momento!</Typography>
        )}
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

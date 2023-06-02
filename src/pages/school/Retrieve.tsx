import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useSchoolContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iDirector, iSchoolList } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { RemoveDone } from "@mui/icons-material";
import { TableServer, Tools } from "../../shared/components";
import { useParams } from "react-router-dom";

interface iCardServerProps {
  server: iDirector;
}

const CardServer = ({ server }: iCardServerProps) => {
  return (
    <TableRow>
      <TableCell>{server.name}</TableCell>
      <TableCell>{server.cpf}</TableCell>
    </TableRow>
  );
};

export const RetrieveSchoolPage = () => {
  const { id } = useParams<"id">();
  const { setLoading } = useAppThemeContext();
  const { schoolYear } = useAuthContext();
  const { updateSchool } = useSchoolContext();
  const [retrieveSchool, setRetrieveSchool] = useState<iSchoolList>();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen((oldOpen) => !oldOpen);
  };

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iSchoolList>(
        `schools/${id}?is_listSchool=true&school_year_id=${schoolYear}`
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
            isHome
            finish={
              <Button
                variant="contained"
                color="error"
                disableElevation
                onClick={handleClose}
                startIcon={<RemoveDone />}
              >
                Desativar
              </Button>
            }
          />
        }
      >
        {retrieveSchool && retrieveSchool.servers.length > 0 ? (
          <TableServer>
            <>
              {retrieveSchool.servers.map((el) => (
                <CardServer key={el.server.id} server={el.server} />
              ))}
            </>
          </TableServer>
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

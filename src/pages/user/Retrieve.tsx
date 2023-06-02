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
} from "@mui/material";
import { useAppThemeContext, useUserContext } from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iDash, iUser, iWorkSchool } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { Delete, RemoveDone } from "@mui/icons-material";
import { TableRetrieveUser, Tools } from "../../shared/components";
import { useParams } from "react-router-dom";

interface iCardUserProps {
  work: iWorkSchool;
}

const dashPtBr = (dash: iDash) => {
  switch (dash) {
    case "ADMIN":
      return "Administrador";

    case "COMMON":
      return "Servidor";

    case "SCHOOL":
      return "Secretário";
  }
};

const CardUser = ({ work }: iCardUserProps) => {
  const { updateUserData, updateAllUser } = useUserContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen((oldOpen) => !oldOpen);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Tooltip title="Remover Usuário da Função">
            <IconButton color="error" onClick={handleClose}>
              <Delete />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>{work.school.name}</TableCell>
        <TableCell>{dashPtBr(work.dash)}</TableCell>
      </TableRow>

      {updateUserData && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Desativar Usuário</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deseja continuar desativando o usúario{" "}
              {updateUserData.name.toUpperCase()}?
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                onClick={() => {
                  updateAllUser(
                    updateUserData.id,
                    {
                      role: "SERV",
                      is_active: false,
                    },
                    false
                  );
                  setOpen(!open);
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

export const RetrieveUserPage = () => {
  const { id } = useParams<"id">();
  const { setLoading } = useAppThemeContext();
  const { updateAllUser } = useUserContext();
  const [retrieveUser, setRetrieveUser] = useState<iUser>();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen((oldOpen) => !oldOpen);
  };

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iUser>(`users/${id}`)
      .then((res) => setRetrieveUser(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <LayoutBasePage
        title={
          retrieveUser?.name
            ? retrieveUser?.name
            : "Listagem de Funções do Usuários"
        }
        tools={
          <Tools
            isBack
            back="/user/list"
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
        {retrieveUser && retrieveUser.work_school.length > 0 ? (
          <TableRetrieveUser>
            <>
              {retrieveUser.work_school.map((el) => (
                <CardUser key={el.school.id} work={el} />
              ))}
            </>
          </TableRetrieveUser>
        ) : (
          <Typography m={2}>Usuário sem funções no momento!</Typography>
        )}
      </LayoutBasePage>
      {retrieveUser && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Desativar Usuário</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deseja continuar desativando o usúario{" "}
              {retrieveUser.name.toUpperCase()}?
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                onClick={() => {
                  updateAllUser(
                    retrieveUser.id,
                    {
                      role: "SERV",
                      is_active: false,
                    },
                    false,
                    "/user/list"
                  );
                  setOpen(!open);
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

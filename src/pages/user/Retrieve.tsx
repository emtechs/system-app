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
import {
  useAppThemeContext,
  useSchoolContext,
  useUserContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iUser, iWorkSchool } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { Delete, RemoveDone } from "@mui/icons-material";
import { TableRetrieveUser, Tools } from "../../shared/components";
import { useParams, useSearchParams } from "react-router-dom";
import { rolePtBr } from "../../shared/scripts";

interface iCardUserProps {
  user: iUser;
  work: iWorkSchool;
}

const CardUser = ({ user, work }: iCardUserProps) => {
  const { updateServerData, setUpdateServerData, deleteServer } =
    useSchoolContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen((oldOpen) => !oldOpen);
    setUpdateServerData(work);
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
        <TableCell>{rolePtBr(work.role)}</TableCell>
      </TableRow>

      {updateServerData && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Remover Usuário da Função</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deseja continuar removendo o usúario {user.name.toUpperCase()} da
              Função {rolePtBr(updateServerData.role).toUpperCase()} da Escola{" "}
              {updateServerData.school.name}?
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                onClick={() => {
                  deleteServer(updateServerData.school.id, user.id);
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
  const [searchParams] = useSearchParams();
  const school_id = searchParams.get("school_id");
  const { setLoading } = useAppThemeContext();
  const { updateAllUser } = useUserContext();
  const { updateServerData } = useSchoolContext();
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
  }, [updateServerData]);

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
            back={school_id ? `/school/${school_id}` : "/user/list"}
            isHome
            finish={
              <Button
                variant="contained"
                color="error"
                disableElevation
                onClick={handleClose}
                endIcon={<RemoveDone />}
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
                <CardUser key={el.school.id} user={retrieveUser} work={el} />
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

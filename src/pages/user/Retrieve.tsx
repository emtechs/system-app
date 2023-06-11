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
  useSchoolContext,
  useTableContext,
  useUserContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iUser, iWorkSchool, iheadCell } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { Delete, RemoveDone } from "@mui/icons-material";
import { TableBase, Tools } from "../../shared/components";
import { useParams, useSearchParams } from "react-router-dom";
import { rolePtBr } from "../../shared/scripts";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Escola" },
  { numeric: false, label: "Função" },
];

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
  const { updateAllUser } = useUserContext();
  const { updateServerData } = useSchoolContext();
  const { setIsLoading } = useTableContext();
  const [retrieveUser, setRetrieveUser] = useState<iUser>();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen((oldOpen) => !oldOpen);
  };

  useEffect(() => {
    setIsLoading(true);
    apiUsingNow
      .get<iUser>(`users/${id}`)
      .then((res) => setRetrieveUser(res.data))
      .finally(() => setIsLoading(false));
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
        <TableBase headCells={headCells} is_active>
          {retrieveUser?.work_school.map((el) => (
            <CardUser key={el.school.id} user={retrieveUser} work={el} />
          ))}
        </TableBase>
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

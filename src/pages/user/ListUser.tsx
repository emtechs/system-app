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
  useAuthContext,
  useUserContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iRole, iUser } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { RemoveDone } from "@mui/icons-material";
import { TableUser } from "../../shared/components";
import { useNavigate } from "react-router-dom";

interface iCardUserProps {
  user: iUser;
}

const rolePtBr = (role: iRole) => {
  switch (role) {
    case "ADMIN":
      return "Administrador";

    case "DIRET":
      return "Diretor de Escola";

    case "SECRET":
      return "Secretário";

    case "SERV":
      return "Servidor";
  }
};

const CardUser = ({ user }: iCardUserProps) => {
  const navigate = useNavigate();
  const { userData } = useAuthContext();
  const { updateUserData, setUpdateUserData, updateAllUser } = useUserContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setUpdateUserData(user);
    setOpen((oldOpen) => !oldOpen);
  };
  const isUser = () => {
    if (userData?.id === user.id) return false;

    if (user?.role === "ADMIN") return true;

    if (user?.role !== "SERV") return false;

    return true;
  };

  return (
    <>
      <TableRow
        hover={user.role === "SERV"}
        sx={{ cursor: user.role === "SERV" ? "pointer" : "unset" }}
        onClick={() => {
          if (user.role === "SERV") {
            navigate(`/user/list/${user.id}`);
          }
        }}
      >
        <TableCell>
          {isUser() && (
            <Tooltip title="Desativar Usuário">
              <IconButton color="error" onClick={handleClose}>
                <RemoveDone />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.cpf}</TableCell>
        <TableCell>{rolePtBr(user.role)}</TableCell>
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

export const ListUser = () => {
  const { setLoading } = useAppThemeContext();
  const { updateUserData } = useUserContext();
  const [listUserData, setListUserData] = useState<iUser[]>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iUser[]>("users?is_active=true")
      .then((res) => setListUserData(res.data))
      .finally(() => setLoading(false));
  }, [updateUserData]);

  return (
    <LayoutBasePage title="Listagem de Usuários">
      {listUserData && listUserData.length > 0 ? (
        <TableUser>
          <>
            {listUserData.map((el) => (
              <CardUser key={el.id} user={el} />
            ))}
          </>
        </TableUser>
      ) : (
        <Typography m={2}>Nenhum usuário ativo no momento!</Typography>
      )}
    </LayoutBasePage>
  );
};

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  useUserContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iRole, iUser } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { BasePage } from "../../shared/components";

interface iCardUserProps {
  user: iUser;
  theme: Theme;
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

const CardUser = ({ user, theme }: iCardUserProps) => {
  const { userData } = useAuthContext();
  const { updateUserData, setUpdateUserData, updateAllUser } = useUserContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setUpdateUserData(user);
    setOpen(!open);
  };
  const isUser = () => {
    if (userData?.id === user.id) return true;

    if (user?.role === "ADMIN") return false;

    if (user?.role !== "SERV") return true;

    return false;
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          height: 80,
          maxWidth: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: theme.palette.success.main,
        }}
      >
        <CardContent
          onClick={
            isUser()
              ? () => {
                  setOpen(false);
                  setUpdateUserData(undefined);
                }
              : handleClose
          }
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            cursor: isUser() ? "unset" : "pointer",
            position: "relative",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar>{user.name[0].toUpperCase()}</Avatar>
            <Box>
              <Typography
                fontSize={11}
                color={theme.palette.secondary.contrastText}
              >
                {user.cpf}
              </Typography>
              <Typography
                fontSize={11}
                color={theme.palette.secondary.contrastText}
              >
                {user.name}
              </Typography>
            </Box>
            <Typography fontSize={10} color={theme.palette.grey[300]}>
              {rolePtBr(user.role)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

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

interface iListUserProps {
  back: string;
}

export const ListUser = ({ back }: iListUserProps) => {
  const theme = useTheme();
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
    <BasePage isProfile back={back}>
      {listUserData && (
        <Box display="flex" flexDirection="column" gap={theme.spacing(2)}>
          {listUserData.map((user) => (
            <CardUser key={user.id} user={user} theme={theme} />
          ))}
        </Box>
      )}
    </BasePage>
  );
};

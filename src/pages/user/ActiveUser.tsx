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
import { useAppThemeContext, useUserContext } from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iRole, iUser } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { BasePage } from "../../shared/components";
import { FormContainer, RadioButtonGroup } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { activeUserSchema } from "../../shared/schemas";

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
  const { updateUserData, setUpdateUserData, updateAllUser } = useUserContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setUpdateUserData(user);
    setOpen(!open);
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
          bgcolor: theme.palette.error.main,
        }}
      >
        <CardContent
          onClick={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar>{user.name[0].toUpperCase()}</Avatar>
            <Box>
              <Typography
                fontSize={10}
                color={theme.palette.secondary.contrastText}
              >
                {user.cpf}
              </Typography>
              <Typography
                fontSize={10}
                color={theme.palette.secondary.contrastText}
              >
                {user.name}
              </Typography>
            </Box>
            <Typography fontSize={8} color={theme.palette.grey[300]}>
              {rolePtBr(user.role)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {updateUserData && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ativar Usuário</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deseja continuar ativando o usúario{" "}
              {updateUserData.name.toUpperCase()}?
            </DialogContentText>
            <FormContainer
              onSuccess={(data) => {
                updateAllUser(updateUserData.id, data, false);
                setOpen(!open);
              }}
              resolver={zodResolver(activeUserSchema)}
            >
              <Box mt={1} display="flex" flexDirection="column" gap={1}>
                <RadioButtonGroup
                  label="Tipo do Usuário"
                  name="role"
                  options={[
                    {
                      id: "ADMIN",
                      label: "Administrador",
                    },
                    {
                      id: "SERV",
                      label: "Servidor",
                    },
                  ]}
                  required
                />
                <Button variant="contained" type="submit" fullWidth>
                  Continuar
                </Button>
              </Box>
            </FormContainer>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

interface iActiveUserProps {
  back: string;
}

export const ActiveUser = ({ back }: iActiveUserProps) => {
  const theme = useTheme();
  const { setLoading } = useAppThemeContext();
  const { updateUserData } = useUserContext();
  const [listUserData, setListUserData] = useState<iUser[]>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iUser[]>("users?is_active=false")
      .then((res) => setListUserData(res.data))
      .finally(() => setLoading(false));
  }, [updateUserData]);
  return (
    <BasePage isProfile back={back}>
      {listUserData && listUserData.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={theme.spacing(2)}>
          {listUserData.map((user) => (
            <CardUser key={user.id} user={user} theme={theme} />
          ))}
        </Box>
      ) : (
        <Typography>Nenhum usuário para ativar no momento!</Typography>
      )}
    </BasePage>
  );
};

import {
  Box,
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
import { iUser } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { TableUser, Tools } from "../../shared/components";
import { FormContainer, RadioButtonGroup } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { activeUserSchema } from "../../shared/schemas";
import { LayoutBasePage } from "../../shared/layouts";
import { DoneAll } from "@mui/icons-material";
import { rolePtBr } from "../../shared/scripts";

interface iCardUserProps {
  user: iUser;
}

const CardUser = ({ user }: iCardUserProps) => {
  const { updateUserData, setUpdateUserData, updateAllUser } = useUserContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setUpdateUserData(user);
    setOpen((oldOpen) => !oldOpen);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Tooltip title="Ativar Usuário">
            <IconButton color="success" onClick={handleClose}>
              <DoneAll />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.cpf}</TableCell>
        <TableCell>{rolePtBr(user.role)}</TableCell>
      </TableRow>

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

export const ActiveUserPage = () => {
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
    <LayoutBasePage
      title="Listagem de Usuários"
      tools={<Tools isHome isBack back="/user/list" />}
    >
      {listUserData && listUserData.length > 0 ? (
        <TableUser is_active>
          <>
            {listUserData.map((el) => (
              <CardUser key={el.id} user={el} />
            ))}
          </>
        </TableUser>
      ) : (
        <Typography m={2}>Nenhum usuário para ativar no momento!</Typography>
      )}
    </LayoutBasePage>
  );
};

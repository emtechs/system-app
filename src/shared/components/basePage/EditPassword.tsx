import { Button, IconButton } from "@mui/material";
import {
  useAuthContext,
  useModalContext,
  useUserContext,
} from "../../contexts";
import { ModalGeneral } from "../modal";
import { FormContainer, PasswordElement } from "react-hook-form-mui";
import { userPasswordSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoxResp, Glossary } from "../../components";
import { Info } from "@mui/icons-material";
import { useState } from "react";

export const EditPassword = () => {
  const { openEditPassword, handleOpenEditPassword } = useModalContext();
  const { userData } = useAuthContext();
  const { editPassword } = useUserContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <ModalGeneral
        open={openEditPassword}
        handleClose={handleOpenEditPassword}
      >
        <FormContainer
          onSuccess={(data) => {
            if (userData) editPassword(userData.id, data);
          }}
          resolver={zodResolver(userPasswordSchema)}
        >
          <BoxResp>
            <IconButton onClick={handleOpen} color="secondary">
              <Info />
            </IconButton>
            <PasswordElement
              name="old_password"
              label="Senha Atual"
              required
              fullWidth
            />
            <PasswordElement
              name="password"
              label="Nova Senha"
              required
              fullWidth
            />
            <PasswordElement
              name="repeat_password"
              label="Confirmar Nova Senha"
              required
              fullWidth
            />
            <Button variant="contained" type="submit" fullWidth>
              Enviar
            </Button>
          </BoxResp>
        </FormContainer>
      </ModalGeneral>
      <Glossary open={open} onClose={handleOpen}>
        Para atualizar sua senha, preencha os campos com sua senha atual, a nova
        senha desejada e confirme-a.
      </Glossary>
    </>
  );
};

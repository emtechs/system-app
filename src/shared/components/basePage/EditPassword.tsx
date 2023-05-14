import { Button } from "@mui/material";
import { useModalProfileContext, useUserContext } from "../../contexts";
import { ModalGeneral } from "../modal";
import { FormContainer, PasswordElement } from "react-hook-form-mui";
import { userPasswordSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasePageDefault } from "./Default";
import { BoxResp } from "..";

export const EditPassword = () => {
  const { openEditPassword, handleOpenEditPassword } = useModalProfileContext();
  const { userData, editPassword } = useUserContext();

  return (
    <ModalGeneral open={openEditPassword} handleClose={handleOpenEditPassword}>
      <BasePageDefault>
        <FormContainer
          onSuccess={(data) => {
            if (userData) editPassword(userData.id, data);
          }}
          resolver={zodResolver(userPasswordSchema)}
        >
          <BoxResp>
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
      </BasePageDefault>
    </ModalGeneral>
  );
};

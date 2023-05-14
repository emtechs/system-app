import { zodResolver } from "@hookform/resolvers/zod";
import { Button, IconButton } from "@mui/material";
import { Info } from "@mui/icons-material";
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
} from "react-hook-form-mui";
import { userFirstSchema } from "../../shared/schemas";
import { useUserContext } from "../../shared/contexts";
import { BasePage, BoxResp, Glossary } from "../../shared/components";
import { useState } from "react";

export const First = () => {
  const { first, userData } = useUserContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <BasePage padding={5}>
        <FormContainer
          onSuccess={(data) => {
            if (userData) first(userData.id, data);
          }}
          resolver={zodResolver(userFirstSchema)}
        >
          <BoxResp>
            <IconButton onClick={handleOpen} color="secondary">
              <Info />
            </IconButton>
            <TextFieldElement
              name="name"
              label="Nome completo"
              required
              fullWidth
            />
            <TextFieldElement name="email" label="Email" required fullWidth />
            <PasswordElement name="password" label="Senha" required fullWidth />
            <PasswordElement
              name="repeat_password"
              label="Confirmar Senha"
              required
              fullWidth
            />
            <Button variant="contained" type="submit" fullWidth>
              Enviar
            </Button>
          </BoxResp>
        </FormContainer>
      </BasePage>
      <Glossary open={open} onClose={handleOpen}>
        Preencha as informações com seus dados para obter acesso ao sistema.
      </Glossary>
    </>
  );
};

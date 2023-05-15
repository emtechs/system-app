import { Button, IconButton } from "@mui/material";
import { useModalProfileContext, useUserContext } from "../../contexts";
import { ModalGeneral } from "../modal";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateSchema } from "../../schemas";
import { BoxResp, Glossary } from "../../components";
import { Info } from "@mui/icons-material";
import { useState } from "react";

export const EditProfile = () => {
  const { openEditProfile, handleOpenEditProfile } = useModalProfileContext();
  const { userData, updateUser } = useUserContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <ModalGeneral open={openEditProfile} handleClose={handleOpenEditProfile}>
        <FormContainer
          defaultValues={{
            name: userData ? userData.name : "",
            email: userData ? userData.email : "",
          }}
          onSuccess={(data) => {
            if (userData) updateUser(userData.id, data);
          }}
          resolver={zodResolver(userUpdateSchema)}
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
            <Button variant="contained" type="submit" fullWidth>
              Enviar
            </Button>
          </BoxResp>
        </FormContainer>
      </ModalGeneral>
      <Glossary open={open} onClose={handleOpen}>
        Atualize as informações do seu perfil preenchendo os dados que deseja
        modificar!
      </Glossary>
    </>
  );
};

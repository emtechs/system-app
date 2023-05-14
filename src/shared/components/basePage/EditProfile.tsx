import { Button } from "@mui/material";
import { useModalProfileContext, useUserContext } from "../../contexts";
import { ModalGeneral } from "../modal";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateSchema } from "../../schemas";
import { BasePageDefault } from "./Default";
import { BoxResp } from "..";

export const EditProfile = () => {
  const { openEditProfile, handleOpenEditProfile } = useModalProfileContext();
  const { userData, updateUser } = useUserContext();
  return (
    <ModalGeneral open={openEditProfile} handleClose={handleOpenEditProfile}>
      <BasePageDefault>
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
      </BasePageDefault>
    </ModalGeneral>
  );
};

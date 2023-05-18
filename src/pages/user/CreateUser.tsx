import { BasePage, BoxResp, ValidateCPF } from "../../shared/components";
import { useUserContext } from "../../shared/contexts";
import {
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
} from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { userCreateSchema } from "../../shared/schemas";

interface iCreateUserProps {
  back?: string;
}

export const CreateUser = ({ back }: iCreateUserProps) => {
  const { create } = useUserContext();

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={(data) => {
          create(data, back);
        }}
        resolver={zodResolver(userCreateSchema)}
      >
        <BoxResp isProfile>
          <TextFieldElement name="cpf" label="CPF" required fullWidth />
          <TextFieldElement name="name" label="Nome" required fullWidth />

          <RadioButtonGroup
            label="Tipo do Usuário"
            name="role"
            options={[
              {
                id: "ADMIN",
                label: "Administrador",
              },
              {
                id: "SECRET",
                label: "Secretário",
              },
              {
                id: "DIRET",
                label: "Diretor",
              },
            ]}
            required
          />
          <ValidateCPF />
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};

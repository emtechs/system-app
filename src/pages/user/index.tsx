import { BasePage, BoxResp, ValidateCPF } from "../../shared/components";
import {
  useAuthContext,
  useSchoolContext,
  useUserContext,
} from "../../shared/contexts";
import {
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
} from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { serverCreateSchema, userCreateSchema } from "../../shared/schemas";

export const User = () => {
  const { dashData, schoolData } = useAuthContext();
  const { create } = useUserContext();
  const { createServer } = useSchoolContext();

  switch (dashData) {
    case "ADMIN":
      return (
        <BasePage isProfile>
          <FormContainer
            onSuccess={create}
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
              <ValidateCPF dash={dashData} />
            </BoxResp>
          </FormContainer>
        </BasePage>
      );
    case "SCHOOL":
      return (
        <BasePage isProfile>
          <FormContainer
            onSuccess={(data) => {
              if (schoolData) createServer(data, schoolData.school.id);
            }}
            resolver={zodResolver(serverCreateSchema)}
          >
            <BoxResp isProfile>
              <TextFieldElement name="cpf" label="CPF" required fullWidth />
              <TextFieldElement name="name" label="Nome" required fullWidth />

              <RadioButtonGroup
                label="Tela do Usuário"
                name="dash"
                options={[
                  {
                    id: "COMMON",
                    label: "Comum",
                  },
                  {
                    id: "SCHOOL",
                    label: "Escola",
                  },
                ]}
                required
              />
              <ValidateCPF dash={dashData} school_id={schoolData?.school.id} />
            </BoxResp>
          </FormContainer>
        </BasePage>
      );

    default:
      return <></>;
  }
};

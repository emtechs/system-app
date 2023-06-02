import {
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
} from "react-hook-form-mui";
import { BasePage, BoxResp, ValidateCPF } from "../../../shared/components";
import { useAuthContext, useSchoolContext } from "../../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { serverCreateSchema } from "../../../shared/schemas";

export const CreateServerCommon = () => {
  const { schoolData } = useAuthContext();
  const { createServer } = useSchoolContext();

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
          <ValidateCPF school_id={schoolData?.school.id} />
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};

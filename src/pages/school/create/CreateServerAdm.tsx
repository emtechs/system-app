import {
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
} from "react-hook-form-mui";
import { useSchoolContext } from "../../../shared/contexts";
import { iPageProps } from "../../../shared/interfaces";
import {
  BasePage,
  BoxResp,
  SelectSchool,
  ValidateCPF,
} from "../../../shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { serverCreateSchema } from "../../../shared/schemas";

export const CreateServerAdm = ({ back }: iPageProps) => {
  const { createServer, schoolSelect } = useSchoolContext();

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={(data) => {
          if (schoolSelect) createServer(data, schoolSelect.id, back);
        }}
        resolver={zodResolver(serverCreateSchema)}
      >
        <BoxResp isProfile>
          <SelectSchool />
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
          <ValidateCPF school_id={schoolSelect?.id} />
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};

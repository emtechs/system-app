import { useSchoolContext } from "../../../shared/contexts";
import { BasePage, BoxResp, ValidateCPF } from "../../../shared/components";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { schoolCreateSchema } from "../../../shared/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

interface iCreateSchoolProps {
  back?: string;
}

export const CreateSchool = ({ back }: iCreateSchoolProps) => {
  const { createSchool } = useSchoolContext();

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={(data) => createSchool(data, back)}
        resolver={zodResolver(schoolCreateSchema)}
      >
        <BoxResp isProfile>
          <TextFieldElement
            name="name"
            label="Nome da Escola"
            required
            fullWidth
          />
          <TextFieldElement
            name="cpf"
            label="CPF do Diretor"
            required
            fullWidth
          />
          <TextFieldElement
            name="name_diret"
            label="Nome do Diretor"
            required
            fullWidth
          />
          <ValidateCPF allNotServ />
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};

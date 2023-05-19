import { BasePage, BoxResp, ValidateCPF } from "../../shared/components";
import { useUserContext } from "../../shared/contexts";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAdmSchema } from "../../shared/schemas";

interface iCreateAdmProps {
  back?: string;
}

export const CreateAdm = ({ back }: iCreateAdmProps) => {
  const { createAdm } = useUserContext();

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={(data) => {
          createAdm(data, back);
        }}
        resolver={zodResolver(createAdmSchema)}
      >
        <BoxResp isProfile>
          <TextFieldElement name="cpf" label="CPF" required fullWidth />
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <ValidateCPF />
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};

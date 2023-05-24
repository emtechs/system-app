import { useSchoolContext } from "../../../shared/contexts";
import { BasePage, BoxResp } from "../../../shared/components";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { schoolCreateSchema } from "../../../shared/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { iPageProps } from "../../../shared/interfaces";
import { Button } from "@mui/material";

export const CreateSchool = ({ back }: iPageProps) => {
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
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};

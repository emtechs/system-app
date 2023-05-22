import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { BasePage, BoxResp, SelectSchool } from "../../../shared/components";
import { useSchoolContext } from "../../../shared/contexts";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { classCreateSchema } from "../../../shared/schemas";
import { iPageProps } from "../../../shared/interfaces";

export const CreateClassAdm = ({ back }: iPageProps) => {
  const { createClass, schoolSelect } = useSchoolContext();

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={(data) => {
          if (schoolSelect) createClass(data, schoolSelect.id, back);
        }}
        resolver={zodResolver(classCreateSchema)}
      >
        <BoxResp isProfile>
          <SelectSchool />
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};

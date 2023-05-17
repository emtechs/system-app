import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { BasePage, BoxResp } from "../../shared/components";
import { useAuthContext, useSchoolContext } from "../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { classCreateSchema } from "../../shared/schemas";
import { Button } from "@mui/material";

export const ClassPage = () => {
  const { schoolData } = useAuthContext();
  const { createClass } = useSchoolContext();

  return (
    <BasePage isProfile>
      <FormContainer
        onSuccess={(data) => {
          if (schoolData) createClass(data, schoolData?.school.id);
        }}
        resolver={zodResolver(classCreateSchema)}
      >
        <BoxResp isProfile>
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};

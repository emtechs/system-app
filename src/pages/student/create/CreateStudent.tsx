import { useSchoolContext, useStudentContext } from "../../../shared/contexts";
import { BasePage, BoxResp, SelectClass } from "../../../shared/components";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentCreateSchema } from "../../../shared/schemas";
import { Button } from "@mui/material";

export const CreateStudentPage = () => {
  const { createStudent } = useStudentContext();
  const { schoolSelect } = useSchoolContext();

  return (
    <BasePage isProfile>
      <FormContainer
        onSuccess={(data) => {
          if (schoolSelect) createStudent(data, schoolSelect.id);
        }}
        resolver={zodResolver(studentCreateSchema)}
      >
        <BoxResp isProfile>
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <TextFieldElement
            name="registry"
            label="Matricula"
            required
            fullWidth
          />
          <SelectClass />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};

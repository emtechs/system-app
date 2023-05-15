import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { BasePage, BoxResp, Glossary } from "../../shared/components";
import {
  useModalProfileContext,
  useSchoolContext,
  useUserContext,
} from "../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { classCreateSchema } from "../../shared/schemas";
import { Button } from "@mui/material";

export const ClassPage = () => {
  const { schoolData } = useUserContext();
  const { createClass } = useSchoolContext();
  const { openGlossary, handleOpenGlossary } = useModalProfileContext();

  return (
    <>
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
      <Glossary open={openGlossary} onClose={handleOpenGlossary}>
        <></>
      </Glossary>
    </>
  );
};

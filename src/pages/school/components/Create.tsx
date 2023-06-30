import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { ModalGeneral } from "../../../shared/components";
import { useSchoolContext } from "../../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolCreateSchema } from "../../../shared/schemas";
import { Button } from "@mui/material";

export const Create = () => {
  const { openCreate, handleOpenCreate, createSchool } = useSchoolContext();
  return (
    <ModalGeneral open={openCreate} handleClose={handleOpenCreate}>
      <FormContainer
        onSuccess={(data) => {
          createSchool(data);
          handleOpenCreate();
        }}
        resolver={zodResolver(schoolCreateSchema)}
      >
        <TextFieldElement
          name="name"
          label="Nome da Escola"
          required
          fullWidth
        />
        <Button sx={{ my: 1 }} variant="contained" type="submit" fullWidth>
          Salvar
        </Button>
      </FormContainer>
    </ModalGeneral>
  );
};

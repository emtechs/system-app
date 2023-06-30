import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { ModalGeneral } from "../../../../shared/components";
import { useSchoolContext } from "../../../../shared/contexts";
import { iSchool } from "../../../../shared/interfaces";
import { schoolUpdateSchema } from "../../../../shared/schemas";

interface iEditProps {
  school: iSchool;
}

export const Edit = ({ school }: iEditProps) => {
  const { openEdit, handleOpenEdit, updateSchool } = useSchoolContext();
  return (
    <ModalGeneral open={openEdit} handleClose={handleOpenEdit}>
      <FormContainer
        defaultValues={{
          name: school.name,
        }}
        onSuccess={(data) => {
          updateSchool(data, school.id, "nome");
          handleOpenEdit();
        }}
        resolver={zodResolver(schoolUpdateSchema)}
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

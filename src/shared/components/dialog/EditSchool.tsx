import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { useSchoolContext } from "../../contexts";
import { iDialogSchoolProps } from "../../interfaces";
import { BaseContentChildren, DialogBaseChildren } from "./structure";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolUpdateSchema } from "../../schemas";
import { Button } from "@mui/material";

export const DialogEditSchool = ({ school }: iDialogSchoolProps) => {
  const { updateSchool, openEdit, handleOpenEdit } = useSchoolContext();
  return (
    <DialogBaseChildren
      open={openEdit}
      onClose={handleOpenEdit}
      title="Editar Escola"
      description=""
    >
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
        <BaseContentChildren>
          <TextFieldElement
            name="name"
            label="Nome da Escola"
            required
            fullWidth
          />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  );
};

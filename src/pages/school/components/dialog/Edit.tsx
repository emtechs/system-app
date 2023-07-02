import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import {
  BaseContentChildren,
  DialogBaseChildren,
} from "../../../../shared/components";
import { useSchoolContext } from "../../../../shared/contexts";
import { schoolUpdateSchema } from "../../../../shared/schemas";
import { iDialogSchoolProps } from "../../interface";

export const Edit = ({ onClose, open, school }: iDialogSchoolProps) => {
  const { updateSchool } = useSchoolContext();
  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Editar Escola"
      description=""
    >
      <FormContainer
        defaultValues={{
          name: school.name,
        }}
        onSuccess={(data) => {
          updateSchool(data, school.id, "nome");
          onClose();
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

import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import {
  BaseContentChildren,
  DialogBaseChildren,
} from "../../../../shared/components";
import { useSchoolContext } from "../../../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolCreateSchema } from "../../../../shared/schemas";
import { Button } from "@mui/material";

export const Create = () => {
  const { openCreate, handleOpenCreate, createSchool } = useSchoolContext();
  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Nova Escola"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          createSchool(data);
          handleOpenCreate();
        }}
        resolver={zodResolver(schoolCreateSchema)}
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

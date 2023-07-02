import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import {
  BaseContentChildren,
  DialogBaseChildren,
} from "../../../../shared/components";
import { useSchoolContext } from "../../../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolCreateSchema } from "../../../../shared/schemas";
import { Button } from "@mui/material";
import { iDialogBaseProps } from "../../../../shared/interfaces";

export const Create = ({ onClose, open }: iDialogBaseProps) => {
  const { createSchool } = useSchoolContext();
  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Nova Escola"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          createSchool(data);
          onClose();
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

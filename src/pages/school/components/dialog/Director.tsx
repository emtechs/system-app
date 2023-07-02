import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import {
  BaseContentChildren,
  DialogBaseChildren,
  ValidateCPF,
} from "../../../../shared/components";
import { useSchoolContext } from "../../../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolUpdateDirectorSchema } from "../../../../shared/schemas";
import { Box, Typography } from "@mui/material";
import { iDialogSchoolProps } from "../../interface";

export const Director = ({ onClose, open, school }: iDialogSchoolProps) => {
  const { updateSchool } = useSchoolContext();
  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Definir Diretor"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          const query = school.director
            ? `?director_id=${school.director.id}`
            : undefined;
          updateSchool(data, school.id, "diretor", query);
          onClose();
        }}
        resolver={zodResolver(schoolUpdateDirectorSchema)}
      >
        <BaseContentChildren>
          {school?.director && (
            <Box>
              <Typography>Diretor Atual</Typography>
              <Typography>Nome: {school.director.name}</Typography>
              <Typography>CPF: {school.director.cpf}</Typography>
            </Box>
          )}
          <TextFieldElement name="cpf" label="CPF" required fullWidth />
          <TextFieldElement name="name_diret" label="Nome" required fullWidth />
          <ValidateCPF director school_id={school.id} />
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  );
};

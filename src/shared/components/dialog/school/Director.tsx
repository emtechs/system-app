import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import {
  useDialogContext,
  usePaginationContext,
  useSchoolContext,
} from "../../../contexts";
import { iDialogSchoolProps } from "../../../interfaces";
import { BaseContentChildren, DialogBaseChildren } from "../structure";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolUpdateDirectorSchema } from "../../../schemas";
import { Box, Typography } from "@mui/material";
import { ValidateCPF } from "../../validate";

export const DialogDirectorSchool = ({
  locale,
  school,
}: iDialogSchoolProps) => {
  const { onClickReset } = usePaginationContext();
  const { handleOpenDirector, openDirector } = useDialogContext();
  const { updateSchool } = useSchoolContext();
  return (
    <DialogBaseChildren
      open={openDirector}
      onClose={handleOpenDirector}
      title="Definir Diretor"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          const query = school.director
            ? `?director_id=${school.director.id}`
            : undefined;
          updateSchool(data, school.id, "diretor", locale, query);
          onClickReset();
          handleOpenDirector();
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

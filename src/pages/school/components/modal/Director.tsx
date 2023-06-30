import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { ModalGeneral, ValidateCPF } from "../../../../shared/components";
import { useSchoolContext } from "../../../../shared/contexts";
import { iSchool } from "../../../../shared/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolUpdateDirectorSchema } from "../../../../shared/schemas";
import { Box, Typography } from "@mui/material";

interface iDirectorProps {
  school: iSchool;
}

export const Director = ({ school }: iDirectorProps) => {
  const { openDirector, handleOpenDirector, updateSchool } = useSchoolContext();
  return (
    <ModalGeneral open={openDirector} handleClose={handleOpenDirector}>
      <FormContainer
        onSuccess={(data) => {
          const query = school.director
            ? `?director_id=${school.director.id}`
            : undefined;
          updateSchool(data, school.id, "diretor", query);
          handleOpenDirector();
        }}
        resolver={zodResolver(schoolUpdateDirectorSchema)}
      >
        {school?.director && (
          <Box mb={2}>
            <Typography>Diretor Atual</Typography>
            <Typography>Nome: {school.director.name}</Typography>
            <Typography>CPF: {school.director.cpf}</Typography>
          </Box>
        )}
        <TextFieldElement name="cpf" label="CPF" required fullWidth />
        <TextFieldElement
          sx={{ my: 2 }}
          name="name_diret"
          label="Nome"
          required
          fullWidth
        />
        <ValidateCPF director school_id={school.id} />
      </FormContainer>
    </ModalGeneral>
  );
};

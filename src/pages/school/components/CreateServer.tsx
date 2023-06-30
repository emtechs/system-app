import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { ModalGeneral, ValidateCPF } from "../../../shared/components";
import { useSchoolContext } from "../../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { iSchool } from "../../../shared/interfaces";
import { serverCreateSchema } from "../../../shared/schemas";

interface iCreateServerProps {
  school: iSchool;
}

export const CreateServer = ({ school }: iCreateServerProps) => {
  const { openCreate, handleOpenCreate, createServer } = useSchoolContext();
  return (
    <ModalGeneral open={openCreate} handleClose={handleOpenCreate}>
      <FormContainer
        onSuccess={(data) => {
          createServer(data, school.id);
          handleOpenCreate();
        }}
        resolver={zodResolver(serverCreateSchema)}
      >
        <TextFieldElement name="cpf" label="CPF" required fullWidth />
        <TextFieldElement
          sx={{ my: 2 }}
          name="name"
          label="Nome"
          required
          fullWidth
        />
        <ValidateCPF school_id={school.id} />
      </FormContainer>
    </ModalGeneral>
  );
};

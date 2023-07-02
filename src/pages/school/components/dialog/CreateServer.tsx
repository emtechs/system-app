import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import {
  BaseContentChildren,
  DialogBaseChildren,
  ValidateCPF,
} from "../../../../shared/components";
import { useSchoolContext } from "../../../../shared/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { iSchool } from "../../../../shared/interfaces";
import { serverCreateSchema } from "../../../../shared/schemas";

interface iCreateServerProps {
  school: iSchool;
}

export const CreateServer = ({ school }: iCreateServerProps) => {
  const { openCreate, handleOpenCreate, createServer } = useSchoolContext();
  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Novo Servidor"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          createServer(data, school.id);
          handleOpenCreate();
        }}
        resolver={zodResolver(serverCreateSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement name="cpf" label="CPF" required fullWidth />
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <ValidateCPF school_id={school.id} />
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  );
};

import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { BaseContentChildren, DialogBaseChildren } from "../structure";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAdmSchema } from "../../../schemas";
import { iUserAdmRequest } from "../../../interfaces";
import { useCallback } from "react";
import { useAppThemeContext, useDialogContext } from "../../../contexts";
import { apiUser } from "../../../services";
import { ValidateCPF } from "../../validate";

export const DialogCreateAdmin = () => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext();
  const { handleOpenCreate, openCreate } = useDialogContext();

  const createAdmin = useCallback(async (data: iUserAdmRequest) => {
    try {
      setLoading(true);
      await apiUser.create(data);
      handleSucess("Administrador cadastrado com sucesso!");
    } catch {
      handleError("Não foi possível cadastrar o administrador no momento!");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Novo Administrador"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          handleOpenCreate();
          createAdmin(data);
        }}
        resolver={zodResolver(createAdmSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement name="cpf" label="CPF" required fullWidth />
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <ValidateCPF allNotServ />
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  );
};

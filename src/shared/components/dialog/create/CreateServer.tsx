import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { useAppThemeContext, useDialogContext } from "../../../contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { iServerRequest } from "../../../interfaces";
import { serverCreateSchema } from "../../../schemas";
import { useCallback } from "react";
import { apiUser } from "../../../services";
import { BaseContentChildren, DialogBaseChildren } from "../structure";
import { ValidateCPF } from "../../validate";

interface iDialogCreateServerProps {
  school_id: string;
  getUsers: (query: string, isPage?: boolean) => void;
}

export const DialogCreateServer = ({
  getUsers,
  school_id,
}: iDialogCreateServerProps) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext();
  const { openCreate, handleOpenCreate } = useDialogContext();

  const createServer = useCallback(async (data: iServerRequest, id: string) => {
    try {
      setLoading(true);
      await apiUser.createServer(data, id);
      handleSucess("Servidor cadastrado com sucesso!");
      getUsers(`?school_id=${id}`);
    } catch {
      handleError("Não foi possível cadastrar o servidor no momento!");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Novo Servidor"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          handleOpenCreate();
          createServer(data, school_id);
        }}
        resolver={zodResolver(serverCreateSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement name="cpf" label="CPF" required fullWidth />
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <ValidateCPF school_id={school_id} />
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  );
};

import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { useAppThemeContext, useSchoolContext } from "../../contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { iDialogSchoolProps, iServerRequest } from "../../interfaces";
import { serverCreateSchema } from "../../schemas";
import { useCallback } from "react";
import { apiUser } from "../../services";
import { BaseContentChildren, DialogBaseChildren } from "./structure";
import { ValidateCPF } from "../validate";

interface iDialogCreateServerProps extends iDialogSchoolProps {
  getServers: (id: string, query: string, take: number) => void;
}

export const DialogCreateServer = ({
  getServers,
  school,
}: iDialogCreateServerProps) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext();
  const { openCreate, handleOpenCreate, setOpenCreate } = useSchoolContext();

  const createServer = useCallback(async (data: iServerRequest, id: string) => {
    try {
      setOpenCreate(false);
      setLoading(true);
      await apiUser.createServer(data, id);
      handleSucess("Servidor cadastrado com sucesso!");
      getServers(id, "", 1);
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
          createServer(data, school.id);
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

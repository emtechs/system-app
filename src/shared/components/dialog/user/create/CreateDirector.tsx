import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import {
  FormContainer,
  AutocompleteElement,
  TextFieldElement,
} from "react-hook-form-mui";
import {
  DialogBaseChildren,
  BaseContentChildren,
  ValidateCPF,
} from "../../../../components";
import { useAppThemeContext, useDialogContext } from "../../../../contexts";
import { iSchool, iUserDirectorRequest } from "../../../../interfaces";
import { createDirectorSchema } from "../../../../schemas";
import { apiUser, apiUsingNow } from "../../../../services";

export const DialogCreateDirector = () => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext();
  const { handleOpenDirector, openDirector } = useDialogContext();
  const [schoolDataSelect, setSchoolDataSelect] = useState<iSchool[]>();

  const createDirector = async (data: iUserDirectorRequest) => {
    try {
      setLoading(true);
      await apiUser.create(data);
      handleSucess("Diretor cadastrado com sucesso!");
    } catch {
      handleError("Não foi possível cadastrar o Diretor no momento!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<{ result: iSchool[] }>("schools?is_director=true&is_active=true")
      .then((res) => setSchoolDataSelect(res.data.result))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DialogBaseChildren
      open={openDirector}
      onClose={handleOpenDirector}
      title="Novo Administrador"
      description=""
    >
      <FormContainer
        onSuccess={createDirector}
        resolver={zodResolver(createDirectorSchema)}
      >
        <BaseContentChildren>
          <AutocompleteElement
            name="schools"
            label="Escola"
            multiple
            required
            loading={!schoolDataSelect}
            options={
              schoolDataSelect && schoolDataSelect.length > 0
                ? schoolDataSelect
                : [
                    {
                      id: 1,
                      label: "No momento, não há nenhuma escola sem diretor",
                    },
                  ]
            }
          />
          <TextFieldElement name="cpf" label="CPF" required fullWidth />
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <ValidateCPF director />
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  );
};

import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { BaseContentChildren, DialogBaseChildren } from "../structure";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolCreateSchema } from "../../../schemas";
import { Button } from "@mui/material";
import { iSchoolRequest } from "../../../interfaces";
import { useCallback } from "react";
import { useAppThemeContext, useDialogContext } from "../../../contexts";
import { useNavigate } from "react-router-dom";
import { apiSchool } from "../../../services";

export const DialogCreateSchool = () => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError } = useAppThemeContext();
  const { handleOpenCreate, openCreate } = useDialogContext();

  const createSchool = useCallback(async (data: iSchoolRequest) => {
    try {
      setLoading(true);
      const school = await apiSchool.create(data);
      handleSucess("A escola foi cadastrada com sucesso!");
      navigate("/school/" + school.id);
    } catch {
      handleError(
        "No momento, não foi possível cadastrar a escola. Por favor, tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Nova Escola"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          handleOpenCreate();
          createSchool(data);
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

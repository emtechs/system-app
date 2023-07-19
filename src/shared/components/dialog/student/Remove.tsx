import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { useAppThemeContext, useDialogContext } from "../../../contexts";
import { iStudent, iStudentRemoveRequest } from "../../../interfaces";
import { BaseContentChildren, DialogBaseChildren } from "../structure";
import { apiClass } from "../../../services";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentRemoveSchema } from "../../../schemas";
import { Button } from "@mui/material";

interface iDialogRemoveStudentProps {
  student: iStudent;
}

export const DialogRemoveStudent = ({ student }: iDialogRemoveStudentProps) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext();
  const { openActive, handleOpenActive } = useDialogContext();

  const removeStudent = async (id: string, data: iStudentRemoveRequest) => {
    try {
      setLoading(true);
      await apiClass.destroy(id, data);
      handleSucess("Aluno removido com sucesso!");
    } catch {
      handleError("Não foi possível remover o aluno no momento!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogBaseChildren
      open={openActive}
      onClose={handleOpenActive}
      title="Remover Aluno da Turma"
      description={`Deseja continuar removendo o aluno ${student.name.toUpperCase()} da
      Turma ${student.class.name.toUpperCase()} da Escola ${
        student.school.name
      }?`}
    >
      <FormContainer
        onSuccess={(data) => {
          handleOpenActive();
          removeStudent(student.key, data);
        }}
        resolver={zodResolver(studentRemoveSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement
            name="justify_disabled"
            label="Justificativa"
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

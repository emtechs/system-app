import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import {
  useAppThemeContext,
  useClassContext,
  useDialogContext,
} from "../../../contexts";
import { iStudent, iStudentRemoveRequest } from "../../../interfaces";
import { BaseContentChildren, DialogBaseChildren } from "../structure";
import { apiClass } from "../../../services";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentRemoveSchema } from "../../../schemas";
import { Button } from "@mui/material";

interface iDialogRemoveStudentProps {
  student: iStudent;
  id: string;
}

export const DialogRemoveStudent = ({
  student,
  id,
}: iDialogRemoveStudentProps) => {
  const { getStudents } = useClassContext();
  const { setLoading, handleError, handleSucess } = useAppThemeContext();
  const { openActive, handleOpenActive } = useDialogContext();

  const removeStudent = async (
    id_data: string,
    data: iStudentRemoveRequest
  ) => {
    try {
      setLoading(true);
      await apiClass.destroy(id_data, data);
      handleSucess("Aluno removido com sucesso!");
      getStudents(id);
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

import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import {
  useAppThemeContext,
  useDialogContext,
  useStudentContext,
} from "../../../contexts";
import { iStudent, iStudentRemoveRequest } from "../../../interfaces";
import { BaseContentChildren, DialogBaseChildren } from "../structure";
import { apiClass } from "../../../services";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentRemoveSchema } from "../../../schemas";
import { Button } from "@mui/material";

interface iDialogRemoveStudentProps {
  student: iStudent;
  year_id: string;
}

export const DialogRemoveStudent = ({
  student,
  year_id,
}: iDialogRemoveStudentProps) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext();
  const { getStudents } = useStudentContext();
  const { openActive, handleOpenActive } = useDialogContext();

  const removeStudent = async (id: string, data: iStudentRemoveRequest) => {
    try {
      setLoading(true);
      await apiClass.destroy(id, data);
      handleSucess("Aluno removido com sucesso!");
      getStudents(
        `?is_active=true&year_id=${year_id}&school_id=${student.school.id}&class_id=${student.class.id}`
      );
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

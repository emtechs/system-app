import { useDialogContext } from "../../../contexts";
import { iStudent } from "../../../interfaces";
import { DialogBase } from "../structure";

interface iDialogRemoveStudentProps {
  student: iStudent;
}

export const DialogRemoveStudent = ({ student }: iDialogRemoveStudentProps) => {
  const { openActive, handleOpenActive } = useDialogContext();

  return (
    <DialogBase
      open={openActive}
      onClose={handleOpenActive}
      title="Remover Aluno da Turma"
      description={`Deseja continuar removendo o aluno ${student.name.toUpperCase()} da
      Turma ${student.class.name.toUpperCase()} da Escola ${
        student.school.name
      }?`}
      action={() => {
        handleOpenActive();
      }}
      actionTitle="Continuar"
    />
  );
};

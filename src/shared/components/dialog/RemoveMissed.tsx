import { Box, Typography } from "@mui/material";
import { iFrequencyStudents } from "../../interfaces";
import { useFrequencyContext } from "../../contexts";
import { DialogBase } from "./DialogBase";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

interface iDialogRemoveMissedProps {
  open: boolean;
  onClose: () => void;
  student: iFrequencyStudents;
}

export const DialogRemoveMissed = ({
  open,
  onClose,
  student,
}: iDialogRemoveMissedProps) => {
  const { updateFrequencyStudent } = useFrequencyContext();
  const action = () => {
    updateFrequencyStudent(
      {
        status: "PRESENTED",
        justification: "",
        updated_at: dayjs().format(),
      },
      student.id
    );
    onClose();
  };
  return (
    <DialogBase
      open={open}
      onClose={onClose}
      title="Retirar Falta"
      description={`Deseja continuar removendo a falta do aluno ${student.student.name}
      ?`}
      action={action}
      actionTitle="Continuar"
    >
      <Box mt={1} display="flex" flexDirection="column" gap={1}>
        <Typography>Matrícula: {student.student.registry}</Typography>
        <Typography>Aluno: {student.student.name}</Typography>
        {student.justification && (
          <Typography>Justificativa: {student.justification}</Typography>
        )}
      </Box>
    </DialogBase>
  );
};

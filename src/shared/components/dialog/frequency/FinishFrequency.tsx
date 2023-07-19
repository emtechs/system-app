import { TableCell, TableRow } from "@mui/material";
import {
  useAppThemeContext,
  useDrawerContext,
  useFrequencyContext,
} from "../../../contexts";
import { iFrequencyStudentsBase, iheadCell } from "../../../interfaces";
import { TableBase } from "../../table";
import { DialogBaseChildrenAction } from "../structure";
import { defineBgColorFrequency, statusFrequencyPtBr } from "../../../scripts";

const headCells: iheadCell[] = [
  { order: "registry", numeric: "left", label: "Matrícula" },
  { order: "name", numeric: "left", label: "Aluno" },
  { numeric: "left", label: "Estado da Presença" },
];

interface iCardFrequencyProps {
  student: iFrequencyStudentsBase;
}

const CardFrequency = ({ student }: iCardFrequencyProps) => {
  const { theme } = useAppThemeContext();

  return (
    <TableRow>
      <TableCell>{student.student.registry}</TableCell>
      <TableCell>{student.student.name}</TableCell>
      <TableCell
        sx={{
          bgcolor: defineBgColorFrequency(student.status, theme),
          color: theme.palette.secondary.contrastText,
        }}
      >
        {statusFrequencyPtBr(student.status)}
      </TableCell>
    </TableRow>
  );
};

interface iDialogFinishFrequencyProps {
  open: boolean;
  onClose: () => void;
  frequency_id: string;
  students: iFrequencyStudentsBase[];
}

export const DialogFinishFrequency = ({
  open,
  onClose,
  frequency_id,
  students,
}: iDialogFinishFrequencyProps) => {
  const { updateFrequency } = useFrequencyContext();
  const { handleClickButtonTools } = useDrawerContext();

  const action = () => {
    updateFrequency(
      {
        status: "CLOSED",
        finished_at: Date.now(),
      },
      frequency_id
    );
    handleClickButtonTools();
    onClose();
  };

  return (
    <DialogBaseChildrenAction
      open={open}
      onClose={onClose}
      title="Conferência"
      description={
        "Abaixo estão listados os alunos que você definiu como faltantes ou justificados. Por favor, verifique a listagem e, se estiver correta, clique em continuar para lançar a frequência no sistema."
      }
      action={action}
      actionTitle="Continuar"
    >
      <TableBase
        headCells={headCells}
        message="Todos os alunos estão presentes."
      >
        {students.map((el) => (
          <CardFrequency key={el.id} student={el} />
        ))}
      </TableBase>
    </DialogBaseChildrenAction>
  );
};

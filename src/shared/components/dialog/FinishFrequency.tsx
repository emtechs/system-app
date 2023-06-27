import { TableCell, TableRow, useTheme } from "@mui/material";
import { useDrawerContext, useFrequencyContext } from "../../contexts";
import { DialogBase } from "./DialogBase";
import { iFrequencyStudentsBase, iheadCell } from "../../interfaces";
import { defineBgColorFrequency, statusFrequencyPtBr } from "../../scripts";
import { Pagination } from "../pagination";
import { TableBase } from "../table";

const headCells: iheadCell[] = [
  { order: "registry", numeric: false, label: "Matrícula" },
  { order: "name", numeric: false, label: "Aluno" },
  { numeric: false, label: "Estado da Presença" },
];

interface iCardFrequencyProps {
  student: iFrequencyStudentsBase;
}

const CardFrequency = ({ student }: iCardFrequencyProps) => {
  const theme = useTheme();

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
    <DialogBase
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
        is_pagination={false}
        message="Todos os alunos estão presentes."
      >
        {students.map((el) => (
          <CardFrequency key={el.id} student={el} />
        ))}
      </TableBase>
      <Pagination />
    </DialogBase>
  );
};
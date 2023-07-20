import { RemoveDone, SyncAlt } from "@mui/icons-material";
import { IconButton, TableCell, Tooltip } from "@mui/material";
import { iSchoolStudent } from "../../../../shared/interfaces";
import { useDialogContext } from "../../../../shared/contexts";

interface iActionsStudentProps {
  student: iSchoolStudent;
  handleStudent: (newStudent: iSchoolStudent) => void;
}

export const ActionsStudent = ({
  handleStudent,
  student,
}: iActionsStudentProps) => {
  const { handleOpenEdit, handleOpenActive } = useDialogContext();

  const onClickEdit = () => {
    handleStudent(student);
    handleOpenEdit();
  };

  const onClickActive = () => {
    handleStudent(student);
    handleOpenActive();
  };

  return (
    <TableCell>
      <Tooltip title="Transferir">
        <IconButton color="primary" size="small" onClick={onClickEdit}>
          <SyncAlt fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Remover">
        <IconButton color="error" size="small" onClick={onClickActive}>
          <RemoveDone fontSize="small" />
        </IconButton>
      </Tooltip>
    </TableCell>
  );
};

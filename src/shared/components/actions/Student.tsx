import { RemoveDone, SyncAlt } from '@mui/icons-material'
import { IconButton, TableCell, Tooltip } from '@mui/material'
import { useDialogContext } from '../../contexts'
import { iStudent } from '../../interfaces'

interface iActionsStudentProps {
  student: iStudent
  handleStudent: (newStudent: iStudent) => void
}

export const ActionsStudent = ({
  handleStudent,
  student,
}: iActionsStudentProps) => {
  const { handleOpenEdit, handleOpenActive } = useDialogContext()

  const onClickEdit = () => {
    handleStudent(student)
    handleOpenEdit()
  }

  const onClickActive = () => {
    handleStudent(student)
    handleOpenActive()
  }

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
  )
}

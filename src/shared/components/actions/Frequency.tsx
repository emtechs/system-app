import { Delete, RestartAlt } from '@mui/icons-material'
import { IconButton, TableCell, Tooltip } from '@mui/material'
import { useDialogContext } from '../../contexts'
import { iFrequency } from '../../interfaces'

interface iActionsFrequencyProps {
  frequency: iFrequency
  handleFrequency: (newFrequency: iFrequency) => void
}

export const ActionsFrequency = ({
  frequency,
  handleFrequency,
}: iActionsFrequencyProps) => {
  const { handleOpenEdit, handleOpenActive } = useDialogContext()

  const onClickEdit = () => {
    handleFrequency(frequency)
    handleOpenEdit()
  }

  const onClickActive = () => {
    handleFrequency(frequency)
    handleOpenActive()
  }

  return (
    <TableCell>
      {frequency.finished_at > 0 && (
        <Tooltip title="Reiniciar">
          <IconButton color="primary" size="small" onClick={onClickEdit}>
            <RestartAlt fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Excluir">
        <IconButton color="error" size="small" onClick={onClickActive}>
          <Delete fontSize="small" />
        </IconButton>
      </Tooltip>
    </TableCell>
  )
}

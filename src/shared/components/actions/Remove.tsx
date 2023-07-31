import { RemoveDone, Visibility } from '@mui/icons-material'
import { IconButton, TableCell, Tooltip } from '@mui/material'
import { useDialogContext, usePaginationContext } from '../../../shared'

interface iActionsRemoveProps {
  handleData: () => void
}

export const ActionsRemove = ({ handleData }: iActionsRemoveProps) => {
  const { handleOpenActive } = useDialogContext()
  const { onClickReset } = usePaginationContext()

  const onClickActive = () => {
    handleData()
    handleOpenActive()
  }

  return (
    <TableCell>
      <Tooltip title="Detalhar">
        <IconButton color="primary" size="small" onClick={onClickReset}>
          <Visibility fontSize="small" />
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

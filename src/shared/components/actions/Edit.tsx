import { Edit, Visibility } from '@mui/icons-material'
import { IconButton, TableCell, Tooltip } from '@mui/material'
import { useDialogContext, usePaginationContext } from '../../../shared'

interface iActionsEditProps {
  handleData: () => void
}

export const ActionsEdit = ({ handleData }: iActionsEditProps) => {
  const { handleOpenEdit } = useDialogContext()
  const { onClickReset } = usePaginationContext()

  const onClickEdit = () => {
    handleData()
    handleOpenEdit()
  }

  return (
    <TableCell>
      <Tooltip title="Detalhar">
        <IconButton color="primary" size="small" onClick={onClickReset}>
          <Visibility fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar">
        <IconButton color="success" size="small" onClick={onClickEdit}>
          <Edit fontSize="small" />
        </IconButton>
      </Tooltip>
    </TableCell>
  )
}

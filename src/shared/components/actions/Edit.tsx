import { Edit, Visibility } from '@mui/icons-material'
import { IconButton, TableCell, Tooltip } from '@mui/material'
import { LinkIcon, useDialogContext, useParamsContext } from '../../../shared'

interface iActionsEditProps {
  handleData: () => void
  to: string
}

export const ActionsEdit = ({ handleData, to }: iActionsEditProps) => {
  const { handleOpenEdit } = useDialogContext()
  const { onClickReset } = useParamsContext()

  const onClickEdit = () => {
    handleData()
    handleOpenEdit()
  }

  return (
    <TableCell>
      <LinkIcon
        icon={<Visibility fontSize="small" />}
        label="Detalhar"
        onClick={onClickReset}
        to={to}
      />
      <Tooltip title="Editar">
        <IconButton color="success" size="small" onClick={onClickEdit}>
          <Edit fontSize="small" />
        </IconButton>
      </Tooltip>
    </TableCell>
  )
}

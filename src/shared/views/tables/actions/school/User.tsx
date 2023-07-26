import { RemoveDone, Visibility } from '@mui/icons-material'
import { IconButton, TableCell, Tooltip } from '@mui/material'
import { useDialogContext, usePaginationContext } from '../../../../contexts'
import { iSchoolUser } from '../../../../interfaces'

interface iActionsSchoolUserProps {
  user: iSchoolUser
  handleUser: (newUser: iSchoolUser) => void
}

export const ActionsSchoolUser = ({
  handleUser,
  user,
}: iActionsSchoolUserProps) => {
  const { handleOpenActive } = useDialogContext()
  const { onClickReset } = usePaginationContext()

  const onClickActive = () => {
    handleUser(user)
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

import { IconButton, TableCell, Tooltip } from '@mui/material'
import { DoneAll, RemoveDone, School, Visibility } from '@mui/icons-material'
import {
  useDialogContext,
  usePaginationContext,
} from '../../../../shared/contexts'
import { iUser } from '../../../../shared/interfaces'
import { LinkIcon } from '../../../../shared/components'

interface iActionsUserProps {
  user: iUser
  handleUser: (newUser: iUser) => void
}

export const ActionsUser = ({ handleUser, user }: iActionsUserProps) => {
  const { handleOpenActive, handleOpenEdit } = useDialogContext()
  const { onClickReset } = usePaginationContext()
  const { is_active, id, role } = user

  const onClickActive = () => {
    handleUser(user)
    handleOpenActive()
  }

  const onClickEdit = () => {
    handleUser(user)
    handleOpenEdit()
  }

  return (
    <TableCell>
      {is_active ? (
        <>
          <LinkIcon
            icon={<Visibility fontSize="small" />}
            label="Detalhar"
            onClick={onClickReset}
            to={`/user/${id}`}
          />
          {role !== 'ADMIN' && (
            <Tooltip title="Liberar Acesso">
              <IconButton color="secondary" size="small" onClick={onClickEdit}>
                <School fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Desativar">
            <IconButton color="error" size="small" onClick={onClickActive}>
              <RemoveDone fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Ativar">
          <IconButton color="success" size="small" onClick={onClickActive}>
            <DoneAll fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </TableCell>
  )
}

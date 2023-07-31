import {
  DoneAll,
  Edit,
  Person,
  RemoveDone,
  School,
  Visibility,
} from '@mui/icons-material'
import { IconButton, TableCell, Tooltip } from '@mui/material'
import {
  LinkIcon,
  iRole,
  useDialogContext,
  usePaginationContext,
} from '../../../shared'

interface iActionsActiveProps {
  handleData: () => void
  is_active: boolean
  to: string
  role?: iRole
}

export const ActionsActive = ({
  handleData,
  is_active,
  to,
  role,
}: iActionsActiveProps) => {
  const { handleOpenEdit, handleOpenActive, handleOpenDirector } =
    useDialogContext()
  const { onClickReset } = usePaginationContext()

  const onClickEdit = () => {
    handleData()
    handleOpenEdit()
  }

  const onClickActive = () => {
    handleData()
    handleOpenActive()
  }

  const onClickDirector = () => {
    handleData()
    handleOpenDirector()
  }

  return (
    <TableCell>
      {is_active ? (
        <>
          <LinkIcon
            icon={<Visibility fontSize="small" />}
            label="Detalhar"
            onClick={onClickReset}
            to={to}
          />
          {!role ? (
            <>
              <Tooltip title="Editar">
                <IconButton color="success" size="small" onClick={onClickEdit}>
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Diretor">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={onClickDirector}
                >
                  <Person fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            role !== 'ADMIN' && (
              <Tooltip title="Liberar Acesso">
                <IconButton
                  color="secondary"
                  size="small"
                  onClick={onClickEdit}
                >
                  <School fontSize="small" />
                </IconButton>
              </Tooltip>
            )
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

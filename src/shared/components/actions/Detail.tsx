import { Visibility } from '@mui/icons-material'
import { TableCell } from '@mui/material'
import { LinkIcon, usePaginationContext } from '../../../shared'

interface iActionsDetailProps {
  to: string
}

export const ActionsDetail = ({ to }: iActionsDetailProps) => {
  const { onClickReset } = usePaginationContext()

  return (
    <TableCell>
      <LinkIcon
        icon={<Visibility fontSize="small" />}
        label="Detalhar"
        onClick={onClickReset}
        to={to}
      />
    </TableCell>
  )
}

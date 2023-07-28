import { IconButton, Tooltip } from '@mui/material'
import { usePaginationContext } from '../../../contexts'
import { Check, Close } from '@mui/icons-material'

interface iActiveButtonProps {
  isFem?: boolean
}

export const ActiveButton = ({ isFem = true }: iActiveButtonProps) => {
  const { active, setActive } = usePaginationContext()

  const onClick = () => setActive(!active)

  return active ? (
    <Tooltip title={`Ativ${isFem ? 'a' : 'o'}s`}>
      <IconButton color="success" onClick={onClick}>
        <Check />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title={`Desativ${isFem ? 'a' : 'o'}s`}>
      <IconButton color="error" onClick={onClick}>
        <Close />
      </IconButton>
    </Tooltip>
  )
}

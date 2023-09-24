import { IconButton, Tooltip } from '@mui/material'
import { Check, Close } from '@mui/icons-material'
import { useParamsContext } from '../../../../shared'

interface iActiveButtonProps {
  isFem?: boolean
}

export const ActiveButton = ({ isFem = true }: iActiveButtonProps) => {
  const { active, setActive } = useParamsContext()

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

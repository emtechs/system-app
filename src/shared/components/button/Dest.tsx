import { useAppThemeContext } from '../../contexts'
import { iButtonBaseProps } from '../../interfaces'
import { ButtonMdDown } from './MdDown'
import { Button, IconButton, Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'

interface iButtonDestProps extends iButtonBaseProps {
  to: string
  isResp?: boolean
  isHome?: boolean
}

export const ButtonDest = ({
  to,
  title,
  startIcon,
  endIcon,
  onClick,
  isResp,
  isHome,
}: iButtonDestProps) => {
  const { smDown } = useAppThemeContext()

  return isResp ? (
    <ButtonMdDown
      title={title}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      href={to}
    />
  ) : isHome ? (
    smDown && (
      <Tooltip title={title}>
        <IconButton color="primary" component={Link} to={to} onClick={onClick}>
          {startIcon && startIcon}
          {endIcon && endIcon}
        </IconButton>
      </Tooltip>
    )
  ) : (
    <Button
      variant="contained"
      disableElevation
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      component={Link}
      to={to}
    >
      {title}
    </Button>
  )
}

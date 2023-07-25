import { Button, IconButton, Tooltip } from '@mui/material'
import { useAppThemeContext } from '../../contexts'
import { iButtonBaseProps } from '../../interfaces'
import { Link } from 'react-router-dom'

export const ButtonSmDown = ({
  title,
  href,
  startIcon,
  endIcon,
  onClick,
  color = 'primary',
}: iButtonBaseProps) => {
  const { smDown } = useAppThemeContext()

  return smDown ? (
    href ? (
      <Tooltip title={title}>
        <IconButton color={color} onClick={onClick} component={Link} to={href}>
          {startIcon && startIcon}
          {endIcon && endIcon}
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title={title}>
        <IconButton color={color} onClick={onClick}>
          {startIcon && startIcon}
          {endIcon && endIcon}
        </IconButton>
      </Tooltip>
    )
  ) : href ? (
    <Button
      color={color}
      variant="contained"
      disableElevation
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      component={Link}
      to={href}
    >
      {title}
    </Button>
  ) : (
    <Button
      color={color}
      variant="contained"
      disableElevation
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
    >
      {title}
    </Button>
  )
}

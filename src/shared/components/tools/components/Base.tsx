import { ReactNode } from 'react'
import { Button, IconButton, Tooltip } from '@mui/material'
import { useAppThemeContext } from '../../../contexts'

interface iCompBaseProps {
  title: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const CompBase = ({
  title,
  endIcon,
  onClick,
  startIcon,
  disabled,
}: iCompBaseProps) => {
  const { mdDown } = useAppThemeContext()

  return mdDown ? (
    <Tooltip title={title}>
      <span>
        <IconButton color="primary" onClick={onClick} disabled={disabled}>
          {startIcon && startIcon}
          {endIcon && endIcon}
        </IconButton>
      </span>
    </Tooltip>
  ) : (
    <Button
      variant="contained"
      disableElevation
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </Button>
  )
}

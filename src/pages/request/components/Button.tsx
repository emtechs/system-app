import { ReactNode } from 'react'
import { Button, IconButton, Tooltip } from '@mui/material'
import { useAppThemeContext } from '../../../shared'

interface iButtonRequestPageProps {
  title: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  onClick?: () => void
  color: 'success' | 'error'
}

export const ButtonRequestPage = ({
  title,
  endIcon,
  onClick,
  startIcon,
  color,
}: iButtonRequestPageProps) => {
  const { mdDown } = useAppThemeContext()

  return mdDown ? (
    <Tooltip title={title}>
      <IconButton color={color} onClick={onClick}>
        {startIcon && startIcon}
        {endIcon && endIcon}
      </IconButton>
    </Tooltip>
  ) : (
    <Button
      variant="contained"
      disableElevation
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      color={color}
    >
      {title}
    </Button>
  )
}

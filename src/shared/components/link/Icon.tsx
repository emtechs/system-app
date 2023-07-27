import { IconButton, Tooltip } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { ReactNode } from 'react'

interface iLinkIconProps {
  to?: string
  label: ReactNode
  icon: ReactNode
  onClick?: () => void
}

export const LinkIcon = ({
  icon,
  label,
  to = '/',
  onClick,
}: iLinkIconProps) => {
  return (
    <Tooltip title={label}>
      <IconButton
        color="primary"
        size="small"
        component={RouterLink}
        to={to}
        onClick={onClick}
      >
        {icon}
      </IconButton>
    </Tooltip>
  )
}

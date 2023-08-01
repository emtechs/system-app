import { Chip, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { ReactElement, ReactNode } from 'react'

interface iLinkChipProps {
  to?: string
  label: ReactNode
  icon: ReactElement<unknown, string>
  onClick?: () => void
}

export const LinkChip = ({
  icon,
  label,
  to = '/',
  onClick,
}: iLinkChipProps) => {
  return (
    <Link
      underline="none"
      color="inherit"
      component={RouterLink}
      to={to}
      onClick={onClick}
    >
      <Chip
        clickable
        color="primary"
        variant="outlined"
        label={label}
        icon={icon}
      />
    </Link>
  )
}

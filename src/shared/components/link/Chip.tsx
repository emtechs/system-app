import { Chip, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { ReactElement, ReactNode } from 'react'

interface iLinkChipProps {
  to?: string
  label: ReactNode
  icon: ReactElement<unknown, string>
}

export const LinkChip = ({ icon, label, to = '/' }: iLinkChipProps) => {
  return (
    <Link underline="none" color="inherit" component={RouterLink} to={to}>
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

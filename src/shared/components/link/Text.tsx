import { Link, Skeleton } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

interface iLinkTextProps {
  to?: string
  label: string
  onClick?: () => void
  isLoading?: boolean
  width?: number
}

export const LinkText = ({
  label,
  to = '/',
  onClick,
  isLoading,
  width = 300,
}: iLinkTextProps) => {
  return isLoading ? (
    <Skeleton width={width} />
  ) : (
    <Link
      underline="none"
      variant="body2"
      color="inherit"
      component={RouterLink}
      to={to}
      onClick={onClick}
    >
      {label}
    </Link>
  )
}

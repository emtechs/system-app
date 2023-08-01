import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material'
import { ReactNode } from 'react'
import { useLocation, Link } from 'react-router-dom'

interface iListItemLinkProps {
  icon: ReactNode
  label: string
  to: string
  onClick?: () => void
}

export const ListItemLink = ({
  icon,
  label,
  to,
  onClick,
}: iListItemLinkProps) => {
  const theme = useTheme()
  const location = useLocation()
  const normalizeTo = to.split('?')[0]

  return (
    <ListItemButton
      autoFocus={true}
      onClick={onClick}
      selected={location.pathname === `${normalizeTo}`}
      sx={{ pl: theme.spacing(4) }}
      component={Link}
      to={to}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )
}

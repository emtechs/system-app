import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material'
import { ReactNode } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useDrawerContext } from '../../../contexts'

interface iListItemLinkProps {
  icon: ReactNode
  label: string
  to: string
}

export const ListItemLink = ({ icon, label, to }: iListItemLinkProps) => {
  const theme = useTheme()
  const location = useLocation()
  const { handleClickButton } = useDrawerContext()
  const normalizeTo = to.split('?')[0]

  return (
    <ListItemButton
      autoFocus={true}
      onClick={handleClickButton}
      selected={location.pathname === `/${normalizeTo}`}
      sx={{ pl: theme.spacing(4) }}
      component={Link}
      to={to}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )
}

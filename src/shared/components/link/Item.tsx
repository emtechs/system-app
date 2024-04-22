import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

interface iListItemLinkProps {
  icon?: ReactNode
  label: string
  to: string
  onClick?: () => void
  selected?: boolean
}

export const ListItemLink = ({
  label,
  to,
  icon,
  onClick,
  selected,
}: iListItemLinkProps) => {
  return (
    <ListItemButton
      autoFocus={true}
      onClick={onClick}
      selected={selected}
      component={Link}
      to={to}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={label} />
    </ListItemButton>
  )
}

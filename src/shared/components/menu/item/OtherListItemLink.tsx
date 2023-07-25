import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useDrawerContext } from '../../../contexts'

export interface iOtherListItemLinkProps {
  icon: ReactNode
  label: string
  to?: string
}

export const OtherListItemLink = ({
  icon,
  label,
  to = '',
}: iOtherListItemLinkProps) => {
  const href = '/' + to
  const location = useLocation()
  const { handleClickButton } = useDrawerContext()
  const normalizeHref = href.split('?')[0]

  return (
    <ListItemButton
      autoFocus={true}
      onClick={handleClickButton}
      selected={
        location.pathname === normalizeHref ||
        location.pathname.includes(href + '/')
      }
      href={href}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )
}

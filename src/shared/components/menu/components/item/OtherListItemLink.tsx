import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ReactNode, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useDrawerContext } from '../../../../contexts'

export interface iOtherListItemLinkProps {
  icon: ReactNode
  label: string
  baseHref?: string
  to?: string
}

export const OtherListItemLink = ({
  icon,
  label,
  baseHref = '/',
  to = '',
}: iOtherListItemLinkProps) => {
  const { handleClick } = useDrawerContext()
  const href = baseHref + to
  const location = useLocation()

  const selected = useMemo(() => {
    if (baseHref.length > 1) {
      if (to === '/frequency')
        return (
          location.pathname === href || location.pathname.includes(href + '/')
        )
      return location.pathname === href
    }

    return location.pathname === href || location.pathname.includes(href + '/')
  }, [baseHref, href, location])

  return (
    <ListItemButton
      autoFocus={true}
      onClick={handleClick}
      selected={selected}
      component={Link}
      to={href}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )
}

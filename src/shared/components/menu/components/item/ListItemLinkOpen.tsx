import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { iChildren } from '../../../../interfaces'
import { iOtherListItemLinkProps } from './OtherListItemLink'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

interface iListItemLinkOpenProps extends iChildren, iOtherListItemLinkProps {
  open: boolean
  onClick: () => void
}

export const ListItemLinkOpen = ({
  children,
  icon,
  label,
  onClick,
  open,
}: iListItemLinkOpenProps) => {
  return (
    <>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>{children}</Collapse>
    </>
  )
}

import { useLocation } from 'react-router-dom'
import { IconButton, List, Menu, Tooltip } from '@mui/material'
import { ListItemLink, iMenuLayoutProps } from '../../../shared'

export const MenuLayout = ({
  anchorEl,
  icon,
  onClick,
  onClose,
  open,
  options,
  title,
}: iMenuLayoutProps) => {
  const location = useLocation()

  return (
    <>
      <Tooltip title={title}>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={onClick}
        >
          {icon}
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <List component="div" disablePadding>
          {options.map((el) => (
            <ListItemLink
              key={el.value}
              onClick={onClose}
              to={el.to}
              selected={location.pathname === el.to}
              label={el.value}
            />
          ))}
        </List>
      </Menu>
    </>
  )
}

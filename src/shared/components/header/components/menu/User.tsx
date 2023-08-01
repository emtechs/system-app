import { Edit, Password } from '@mui/icons-material'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import { useDrawerContext } from '../../../..'
import { Link } from 'react-router-dom'

interface iMenuBaseProps {
  anchorEl: HTMLElement | null
  handleClose: () => void
}

export const MenuUser = ({ anchorEl, handleClose }: iMenuBaseProps) => {
  const { handleClickProfile } = useDrawerContext()

  return (
    <Menu
      sx={{ mt: '45px' }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem
        component={Link}
        to="/profile/edit"
        onClick={handleClickProfile}
      >
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        Editar Perfil
      </MenuItem>
      <MenuItem
        component={Link}
        to="/profile/edit/password"
        onClick={handleClickProfile}
      >
        <ListItemIcon>
          <Password />
        </ListItemIcon>
        Editar Senha
      </MenuItem>
    </Menu>
  )
}

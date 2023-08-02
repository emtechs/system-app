import {
  Edit,
  ExpandLess,
  ExpandMore,
  Home,
  Logout,
  Password,
  Person,
} from '@mui/icons-material'
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  useAuthContext,
  useDialogContext,
  useDrawerContext,
} from '../../../../contexts'
import { Link } from 'react-router-dom'

interface iMenuBaseProps {
  anchorEl: HTMLElement | null
  handleClose: () => void
  label: string
  open: boolean
  onClick: () => void
  isHome?: boolean
}

export const MenuUserMdDown = ({
  anchorEl,
  handleClose,
  label,
  onClick,
  open,
  isHome,
}: iMenuBaseProps) => {
  const { logout } = useAuthContext()
  const { handleDisplayDash } = useDrawerContext()
  const { handleOpenCreate, handleOpenEdit } = useDialogContext()

  const onClickHome = () => {
    handleDisplayDash('ADMIN')
    handleClose()
  }

  const onClickEdit = () => {
    handleClose()
    handleOpenCreate()
  }

  const onClickPassword = () => {
    handleClose()
    handleOpenEdit()
  }

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
      {isHome && (
        <MenuItem component={Link} to="/" onClick={onClickHome}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Início" />
        </MenuItem>
      )}
      <MenuItem onClick={onClick}>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </MenuItem>
      <Collapse in={open}>
        <List component="div">
          <ListItemButton onClick={onClickEdit}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Editar Perfil" />
          </ListItemButton>
          <ListItemButton onClick={onClickPassword}>
            <ListItemIcon>
              <Password />
            </ListItemIcon>
            <ListItemText primary="Editar Senha" />
          </ListItemButton>
        </List>
      </Collapse>
      <MenuItem
        onClick={() => {
          handleClose()
          logout()
        }}
      >
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </MenuItem>
    </Menu>
  )
}

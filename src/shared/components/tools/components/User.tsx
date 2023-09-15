import { MouseEvent, useState } from 'react'
import { AddBox, ExpandLess, ExpandMore, PersonAdd } from '@mui/icons-material'
import {
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import { useAppThemeContext, useDialogContext } from '../../../contexts'

export const UserTools = () => {
  const { mdDown } = useAppThemeContext()
  const { handleOpenCreate, handleOpenDirector, handleOpenServer } =
    useDialogContext()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {mdDown ? (
        <Tooltip title="Novo">
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            color="primary"
            onClick={handleClick}
          >
            <AddBox />
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          disableElevation
          variant="contained"
          startIcon={<AddBox />}
          endIcon={open ? <ExpandLess /> : <ExpandMore />}
        >
          Novo
        </Button>
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            handleOpenCreate()
            handleClose()
          }}
        >
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          Administrador
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenDirector()
            handleClose()
          }}
        >
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          Diretor
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenServer()
            handleClose()
          }}
        >
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          Servidor
        </MenuItem>
      </Menu>
    </>
  )
}

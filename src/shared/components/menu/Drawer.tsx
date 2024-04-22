import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Dashboard, FirstPage, Logout } from '@mui/icons-material'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  useAppThemeContext,
  useDrawerContext,
  useAuthContext,
} from '../../../shared'
import { Options } from './options'

export const MenuDrawer = () => {
  const { theme, smDown } = useAppThemeContext()
  const { isDrawerOpen, toggleDrawerOpen, handleClick, displayDash } =
    useDrawerContext()
  const { logout, dashData } = useAuthContext()

  const listButton = useMemo(() => {
    if (dashData === 'ADMIN') {
      if (displayDash === 'ADMIN')
        return (
          <ListItemButton component={Link} to="/dash" onClick={handleClick}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Painel Escola" />
          </ListItemButton>
        )

      return (
        <ListItemButton component={Link} to="/dash" onClick={handleClick}>
          <ListItemIcon>
            <FirstPage />
          </ListItemIcon>
          <ListItemText primary="Voltar" />
        </ListItemButton>
      )
    }

    return (
      <ListItemButton component={Link} to="/" onClick={handleClick}>
        <ListItemIcon>
          <FirstPage />
        </ListItemIcon>
        <ListItemText primary="Voltar" />
      </ListItemButton>
    )
  }, [dashData, displayDash, handleClick])

  return (
    <Drawer
      open={isDrawerOpen}
      variant={smDown ? 'temporary' : 'permanent'}
      onClose={toggleDrawerOpen}
    >
      <Box
        display="flex"
        flexDirection="column"
        width={theme.spacing(28)}
        height="100%"
      >
        <Box width="100%" bgcolor={theme.palette.background.default} p={2}>
          <img src="/logo.webp" alt="EMTI Digital - Massapê - Frequência" />
        </Box>
        <Divider />
        <Box flex={1}>
          <List component="nav">
            <Options />
          </List>
        </Box>
        <Box>
          <List component="nav">
            {listButton}
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </Drawer>
  )
}

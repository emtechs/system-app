import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { Dashboard, FirstPage, Logout, Person } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from '../../contexts'
import { Options } from './options'
import { adaptName } from '../../scripts'
import { useMemo } from 'react'

export const MenuDrawer = () => {
  const { theme, smDown } = useAppThemeContext()
  const { isDrawerOpen, toggleDrawerOpen, handleClick, displayDash } =
    useDrawerContext()
  const { userProfile, logout, dashData } = useAuthContext()
  const user = {
    name: adaptName(userProfile?.name),
  }

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
        <Box
          width="100%"
          bgcolor={theme.palette.primary.main}
          height={theme.spacing(17)}
          display="flex"
          flexDirection="column"
          flexShrink={0}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <img src="/logo_out.webp" alt="De Olho na Frequência" />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={theme.spacing(0.5)}
          >
            <Avatar
              sx={{
                bgcolor: theme.palette.secondary.main,
              }}
            >
              {user.name.length > 0 ? user.name[0].toUpperCase() : <Person />}
            </Avatar>
            <Typography color={theme.palette.primary.contrastText}>
              {user.name}
            </Typography>
          </Box>
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

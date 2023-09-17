import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
} from '@mui/material'
import { MouseEvent, useState } from 'react'
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from '../../contexts'
import { Home, Logout, Menu, Person } from '@mui/icons-material'
import { MenuUser, MenuUserMdDown, Organ } from './components'
import { adaptName } from '../../scripts'
import { Link } from 'react-router-dom'

interface iHeaderProps {
  isHome?: boolean
}

export const Header = ({ isHome }: iHeaderProps) => {
  const { mdDown } = useAppThemeContext()
  const { logout, userProfile } = useAuthContext()
  const { handleDisplayDash } = useDrawerContext()
  const [open, setOpen] = useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const name = adaptName(userProfile?.name)

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  const handleOpenMenuUser = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseMenuUser = () => {
    setAnchorElUser(null)
  }
  const onClick = () => setOpen(!open)

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {!mdDown && <Organ />}
            <Box
              width={mdDown ? '100vw' : '100%'}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <img src="/logo_out.webp" alt="De Olho na Frequência" />
              {!mdDown && (
                <Box display="flex" gap={1}>
                  <>
                    {isHome && (
                      <Button
                        color="secondary"
                        variant="contained"
                        disableElevation
                        startIcon={<Home />}
                        component={Link}
                        to="/"
                        onClick={() => handleDisplayDash('ADMIN')}
                      >
                        Início
                      </Button>
                    )}
                    <Button
                      color="secondary"
                      variant="contained"
                      disableElevation
                      startIcon={<Person />}
                      onClick={handleOpenMenuUser}
                    >
                      {name}
                    </Button>
                    <MenuUser
                      anchorEl={anchorElUser}
                      handleClose={handleCloseMenuUser}
                    />
                  </>
                  <Button
                    color="secondary"
                    variant="contained"
                    disableElevation
                    startIcon={<Logout />}
                    onClick={logout}
                  >
                    Sair
                  </Button>
                </Box>
              )}
              {mdDown && (
                <Tooltip title="Open settings">
                  <IconButton
                    color="inherit"
                    onClick={handleOpenMenu}
                    sx={{ p: 0 }}
                  >
                    <Menu />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {mdDown && (
        <MenuUserMdDown
          anchorEl={anchorEl}
          open={open}
          onClick={onClick}
          handleClose={handleCloseMenu}
          label={name}
          isHome={isHome}
        />
      )}
    </>
  )
}

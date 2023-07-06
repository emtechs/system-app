import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { MouseEvent, useMemo, useState } from "react";
import { useAppThemeContext, useAuthContext } from "../../contexts";
import { Home, Logout, Menu, Person } from "@mui/icons-material";
import { MenuUser, MenuUserMdDown } from "./components";
import { adaptName } from "../../scripts";

interface iHeaderProps {
  isHome?: boolean;
}

export const Header = ({ isHome }: iHeaderProps) => {
  const { mdDown } = useAppThemeContext();
  const { logout, userData } = useAuthContext();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const name = useMemo(() => {
    return adaptName(userData?.name);
  }, [userData]);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenMenuUser = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseMenuUser = () => {
    setAnchorElUser(null);
  };
  const onClick = () => setOpen(!open);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {!mdDown && (
              <Box ml={2} mr={2} height={80}>
                <img style={{ height: "100%" }} src="/header.webp" />
              </Box>
            )}
            <Box
              width={mdDown ? "100vw" : "100%"}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant={mdDown ? "h6" : "h5"}>
                Portal de Frequência
              </Typography>
              {!mdDown && (
                <Box display="flex" gap={1}>
                  <>
                    {isHome && (
                      <Button
                        color="secondary"
                        variant="contained"
                        disableElevation
                        startIcon={<Home />}
                        href="/"
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
  );
};

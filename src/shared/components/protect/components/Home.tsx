import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAppThemeContext, useAuthContext } from "../../../contexts";
import { iChildren } from "../../../interfaces";
import { Adb } from "@mui/icons-material";
import { MouseEvent, useState } from "react";

export const HomeNotAdmin = ({ children }: iChildren) => {
  const { mdDown } = useAppThemeContext();
  const { userData } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  if (userData?.role === "ADMIN") return <>{children}</>;

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {!mdDown && (
              <Box>
                <img src="header.webp" />
              </Box>
            )}
            <Typography
              variant="h6"
              component="a"
              noWrap
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Portal de Frequência
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                  <Adb />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>
                  <Typography textAlign="center"></Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

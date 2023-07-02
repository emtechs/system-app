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
} from "@mui/material";
import { Dashboard, FirstPage, Logout, Person } from "@mui/icons-material";
import { useLocation, Link } from "react-router-dom";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
} from "../../contexts";
import { iChildren } from "../../interfaces";
import { Options } from "./options";
import { adaptName } from "../../scripts";

export const Menu = ({ children }: iChildren) => {
  const location = useLocation();
  const { theme, smDown } = useAppThemeContext();
  const { isDrawerOpen, toggleDrawerOpen, handleClick } = useDrawerContext();
  const { userData, logout, dashData } = useAuthContext();
  const user = {
    name: adaptName(userData?.name),
  };

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
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
              <img src="/pref_massape_out.png" height={theme.spacing(8)} />
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
              {dashData === "ADMIN" &&
              location.pathname.includes("/home/school") ? (
                <Link to="/">
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <FirstPage />
                    </ListItemIcon>
                    <ListItemText primary="Voltar" />
                  </ListItemButton>
                </Link>
              ) : (
                <Link to="/home/school">
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Painel Escola" />
                  </ListItemButton>
                </Link>
              )}
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
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};

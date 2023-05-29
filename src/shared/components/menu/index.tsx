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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { iChildren } from "../../interfaces";
import { Options } from "./options";
import { useAuthContext, useDrawerContext } from "../../contexts";
import { adaptName } from "../../scripts";
import { Logout } from "@mui/icons-material";

export const Menu = ({ children }: iChildren) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  const { userData, logout } = useAuthContext();
  const user = {
    name: adaptName(userData?.name ? userData?.name : ""),
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
                {user.name[0].toUpperCase()}
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

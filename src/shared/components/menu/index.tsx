import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { iChildren } from "../../interfaces";
import { Options } from "./options";
import { useAuthContext, useDrawerContext } from "../../contexts";
import { adaptName } from "../../scripts";

export const Menu = ({ children }: iChildren) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  const { userData } = useAuthContext();
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
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={theme.spacing(1)}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  height: theme.spacing(12),
                  width: theme.spacing(12),
                  fontSize: theme.spacing(7),
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
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};

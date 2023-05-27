import {
  Avatar,
  Box,
  Drawer,
  List,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Class,
  Frequency,
  Import,
  Report,
  School,
  Student,
  User,
} from "./options";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { useModalContext, useAuthContext } from "../../contexts";

export const DashboardAdmin = () => {
  const theme = useTheme();
  const { logout } = useAuthContext();
  const {
    openMenu,
    handleOpenMenu,
    handleClick,
    anchorEl,
    handleOpenEditProfile,
    handleOpenEditPassword,
  } = useModalContext();

  return (
    <>
      <Box bgcolor={theme.palette.background.default}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding={theme.spacing(3)}
          height={theme.spacing(3)}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Typography>Lucas</Typography>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-controls={openMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar>L</Avatar>
            </button>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding={theme.spacing(2)}
        >
          <Box component={Paper}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
      <Menu
        onClose={handleOpenMenu}
        open={openMenu}
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenEditProfile}>Editar Perfil</MenuItem>
        <MenuItem onClick={handleOpenEditPassword}>Editar Senha</MenuItem>
        <MenuItem onClick={logout}>Sair</MenuItem>
      </Menu>
      <Drawer variant="permanent">
        <Box width="100%" display="flex" justifyContent="center">
          <img
            height={theme.spacing(8)}
            src="/pref_massape.png"
            alt="Prefeitura de Massapê"
          />
        </Box>
        <List component="nav">
          <User />
          <School />
          <Class />
          <Student />
          <Frequency />
          <Report />
          <Import />
        </List>
      </Drawer>
    </>
  );
};

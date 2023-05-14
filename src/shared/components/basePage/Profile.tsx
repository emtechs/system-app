import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { iChildren } from "../../interfaces";
import {
  useAuthContext,
  useModalProfileContext,
  useUserContext,
} from "../../contexts";
import { EditProfile } from "./EditProfile";
import { EditPassword } from "./EditPassword";
import { useLocation, useNavigate } from "react-router-dom";

export const BasePageProfile = ({ children }: iChildren) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { userData } = useUserContext();
  const {
    openMenu,
    handleOpenMenu,
    handleClick,
    anchorEl,
    handleOpenEditProfile,
    handleOpenEditPassword,
  } = useModalProfileContext();

  return (
    <>
      <Container
        sx={{ display: "flex", justifyContent: "center", paddingTop: 30 }}
      >
        <Box
          position="relative"
          component={Paper}
          width="100vw"
          maxWidth={600}
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          padding={theme.spacing(2)}
          paddingBottom={theme.spacing(13)}
          gap={theme.spacing(2)}
        >
          {children}
          {location.pathname !== "/" && (
            <Card
              sx={{
                position: "absolute",
                bottom: theme.spacing(2),
                left: theme.spacing(2),
              }}
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("-1");
                }}
              >
                <CardContent
                  style={{ paddingBottom: 16 }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing(2),
                  }}
                >
                  <Avatar>
                    <ArrowBackIosNew />
                  </Avatar>
                  <Typography>Voltar</Typography>
                </CardContent>
              </button>
            </Card>
          )}
          <Card
            sx={{
              position: "absolute",
              bottom: theme.spacing(2),
              right: theme.spacing(2),
            }}
          >
            <button
              style={{ background: "none", border: "none", cursor: "pointer" }}
              aria-controls={openMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleClick}
            >
              <CardContent
                style={{ paddingBottom: 16 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing(2),
                }}
              >
                <Avatar>{userData?.name[0].toUpperCase()}</Avatar>
                <Typography>{userData?.name}</Typography>
              </CardContent>
            </button>
          </Card>
        </Box>
      </Container>
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
      <EditProfile />
      <EditPassword />
    </>
  );
};

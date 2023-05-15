import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { ArrowBackIosNew, Info, Person } from "@mui/icons-material";
import { iChildren } from "../../interfaces";
import {
  useAuthContext,
  useModalProfileContext,
  useUserContext,
} from "../../contexts";
import { EditProfile } from "./EditProfile";
import { EditPassword } from "./EditPassword";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

export const BasePageProfile = ({ children }: iChildren) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { userData, setDashData, schoolData, setSchoolData } = useUserContext();
  const isDash = useMemo(() => {
    if (userData?.work_school.length === 0) {
      return false;
    }
    return schoolData ? false : true;
  }, [userData, schoolData]);
  const [openDialog, setOpenDialog] = useState(isDash);
  const handleOpenDialog = () => setOpenDialog(!openDialog);
  const {
    openMenu,
    handleOpenMenu,
    handleClick,
    anchorEl,
    handleOpenEditProfile,
    handleOpenEditPassword,
    handleOpenGlossary,
  } = useModalProfileContext();

  useEffect(() => {
    if (schoolData) {
      setDashData(schoolData.dash);
    }
  }, [schoolData]);

  return (
    <>
      <Box bgcolor={theme.palette.background.default}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
            alignItems: "center",
          }}
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
            paddingTop={theme.spacing(13)}
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
                  bgcolor: theme.palette.primary.main,
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
                    <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                      <ArrowBackIosNew />
                    </Avatar>
                    <Typography color={theme.palette.primary.contrastText}>
                      Voltar
                    </Typography>
                  </CardContent>
                </button>
              </Card>
            )}
            <Card
              sx={{
                position: "absolute",
                bottom: theme.spacing(2),
                right: theme.spacing(2),
                bgcolor: theme.palette.primary.main,
              }}
            >
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
                <CardContent
                  style={{ paddingBottom: 16 }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing(2),
                  }}
                >
                  <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                    {userData?.name[0].toUpperCase()}
                  </Avatar>
                  <Typography color={theme.palette.primary.contrastText}>
                    {userData?.name.split(" ")[0]}
                  </Typography>
                </CardContent>
              </button>
            </Card>
            {schoolData && (
              <Card
                sx={{
                  position: "absolute",
                  top: theme.spacing(2),
                  left: theme.spacing(2),
                }}
              >
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleOpenDialog}
                >
                  <CardContent
                    style={{ paddingBottom: 16 }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: theme.spacing(2),
                    }}
                  >
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      {schoolData.school.name[0].toUpperCase()}
                    </Avatar>
                    <Typography>
                      {schoolData.school.name.split(" ")[0]}
                    </Typography>
                  </CardContent>
                </button>
              </Card>
            )}
            <Box
              display="flex"
              alignItems="center"
              gap={theme.spacing(2)}
              sx={{
                position: "absolute",
                top: theme.spacing(2),
                right: theme.spacing(2),
              }}
            >
              <IconButton onClick={handleOpenGlossary} color="secondary">
                <Info />
              </IconButton>
              <Card
                sx={{
                  width: 143,
                  height: 73,
                }}
              >
                <CardContent
                  sx={{
                    padding: 0,
                    position: "relative",
                  }}
                >
                  <img
                    src="/pref_massape.png"
                    width="90%"
                    style={{ position: "absolute", top: 6, right: 6 }}
                  />
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
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
      <EditProfile />
      <EditPassword />
      <Dialog open={openDialog} onClose={handleOpenDialog}>
        <DialogTitle>Selecione a Escola</DialogTitle>
        <List sx={{ pt: 0 }}>
          {userData?.work_school.map((el) => (
            <ListItem disableGutters key={el.id}>
              <ListItemButton
                onClick={() => {
                  setSchoolData(el);
                  setOpenDialog(false);
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={el.school.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};

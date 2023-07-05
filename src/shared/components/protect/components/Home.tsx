import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Collapse,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAppThemeContext, useAuthContext } from "../../../contexts";
import { iChildren, iSchool } from "../../../interfaces";
import {
  AccountBox,
  Edit,
  ExpandLess,
  ExpandMore,
  Logout,
  Menu as MenuIcon,
  Password,
  Person,
  School,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { adaptName, adaptNameSchool } from "../../../scripts";
import { apiUser } from "../../../services";

export const HomeNotAdmin = ({ children }: iChildren) => {
  const { mdDown, theme } = useAppThemeContext();
  const { userData, logout, yearData } = useAuthContext();
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [schoolsData, setSchoolsData] = useState<iSchool[]>();

  useEffect(() => {
    if (yearData) {
      apiUser
        .schools(`?year_id=${yearData.id}`)
        .then((res) => setSchoolsData(res.schools));
    }
  }, [yearData]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenMenuUser = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseMenuUser = () => {
    setAnchorElUser(null);
  };
  const onClick = () => setOpen(!open);

  if (userData?.role === "ADMIN") return <>{children}</>;

  return (
    <Box display="flex" flexDirection="column">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {!mdDown && (
              <Box ml={2} mr={2} height={80}>
                <img style={{ height: "100%" }} src="header.webp" />
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
                    <Button
                      color="secondary"
                      variant="contained"
                      disableElevation
                      startIcon={<Person />}
                      onClick={handleOpenMenuUser}
                    >
                      {adaptName(userData?.name)}
                    </Button>
                    <Menu
                      sx={{ mt: "45px" }}
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseMenuUser}
                    >
                      <MenuItem onClick={handleCloseMenuUser}>
                        <ListItemIcon>
                          <Edit />
                        </ListItemIcon>
                        Editar Perfil
                      </MenuItem>
                      <MenuItem onClick={handleCloseMenuUser}>
                        <ListItemIcon>
                          <Password />
                        </ListItemIcon>
                        Editar Senha
                      </MenuItem>
                    </Menu>
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
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {mdDown && (
        <Menu
          sx={{ mt: "45px" }}
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
          <MenuItem onClick={onClick}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary={adaptName(userData?.name)} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
          <Collapse in={open}>
            <List component="div">
              <ListItemButton onClick={handleCloseMenu}>
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="Editar Perfil" />
              </ListItemButton>
              <ListItemButton onClick={handleCloseMenu}>
                <ListItemIcon>
                  <Password />
                </ListItemIcon>
                <ListItemText primary="Editar Senha" />
              </ListItemButton>
            </List>
          </Collapse>
          <MenuItem
            onClick={() => {
              handleCloseMenu();
              logout();
            }}
          >
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </MenuItem>
        </Menu>
      )}

      <Box mt={10}>
        <Container>
          <Box display="flex" justifyContent="space-between">
            <Box component={Paper} width="100%" maxWidth="60vw">
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={1}
              >
                <Typography
                  component="div"
                  variant="h6"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <School />
                  Escolas
                </Typography>
                <TextField
                  size="small"
                  value={search}
                  placeholder="Pesquisar..."
                  onChange={(e) => setSearch?.(e.target.value)}
                />
              </Box>
              <Divider />
              <Box p={1}>
                <Grid container spacing={2}>
                  {schoolsData?.map((el) => (
                    <Grid key={el.id} item xs={4}>
                      <Card>
                        <CardActionArea>
                          <CardHeader
                            avatar={
                              <Avatar
                                sx={{ bgcolor: theme.palette.primary.main }}
                              >
                                {el.name[0]}
                              </Avatar>
                            }
                            title={adaptNameSchool(el.name, 10)}
                            subheader={adaptName(el.director?.name, 10)}
                          />
                          <CardContent>
                            <Box display="flex" flexDirection="column">
                              <Typography variant="caption">
                                {el.name}
                              </Typography>
                              <Typography variant="caption">
                                {el.director?.name}
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
            <Box component={Paper} width="100%" maxWidth="25vw">
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={1}
              >
                <Typography
                  component="div"
                  variant="h6"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <AccountBox />
                  Meu Cadastro
                </Typography>
              </Box>
              <Divider />
              <Box display="flex" flexDirection="column" gap={1} p={1}>
                <Typography
                  component="div"
                  display="flex"
                  gap={1}
                  fontWeight="bolder"
                >
                  Nome:{" "}
                  <Typography variant="subtitle2">{userData?.name}</Typography>
                </Typography>
                <Typography
                  component="div"
                  display="flex"
                  gap={1}
                  fontWeight="bolder"
                >
                  CPF:{" "}
                  <Typography variant="subtitle2">{userData?.cpf}</Typography>
                </Typography>
                <Typography
                  component="div"
                  display="flex"
                  gap={1}
                  fontWeight="bolder"
                >
                  E-mail:{" "}
                  <Typography variant="subtitle2">{userData?.email}</Typography>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useAppThemeContext, useAuthContext } from "../../shared/contexts";
import { iSchoolClass } from "../../shared/interfaces";
import { AccountBox, School } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { adaptName, adaptNameSchool } from "../../shared/scripts";
import { apiUser } from "../../shared/services";
import { HomePageAdmin } from "./Admin";
import { Header } from "../../shared/components";

export const HomePage = () => {
  const { theme } = useAppThemeContext();
  const { userData, yearData } = useAuthContext();
  const [search, setSearch] = useState("");
  const [schoolsData, setSchoolsData] = useState<iSchoolClass[]>();

  useEffect(() => {
    if (yearData) {
      apiUser
        .schoolsClass(yearData.id, "")
        .then((res) => setSchoolsData(res.result));
    }
  }, [yearData]);

  if (userData?.role === "ADMIN") return <HomePageAdmin />;

  return (
    <Box display="flex" flexDirection="column">
      <Header />
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
                              <Typography fontWeight="bolder" variant="caption">
                                {el.name}
                              </Typography>
                              <Typography variant="caption">
                                Turmas: {el.classes}
                              </Typography>
                              <Typography variant="caption">
                                Estudantes: {el.students}
                              </Typography>
                              <Typography variant="caption">
                                Frequências: {el.frequencies}
                              </Typography>
                              <Typography variant="caption">
                                Infrequência: {el.infrequency.toFixed(0)}%
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

import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Checklist, Group, Person, School } from "@mui/icons-material";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { iSchoolClass } from "../../interfaces";
import { GridDashContent } from "./GridDashContent";
import { GridDashOrgan } from "./Organ";
import { adaptName } from "../../scripts";
import { Link } from "react-router-dom";

interface iGridDashSchoolAdminProps {
  school: iSchoolClass;
}

export const GridDashSchoolAdmin = ({ school }: iGridDashSchoolAdminProps) => {
  const { theme } = useAppThemeContext();
  const { handleClickFrequency } = useDrawerContext();

  return (
    <Grid container item direction="row" xs={12} md={5} spacing={2}>
      <Grid item xs={12}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Box mx={2} width={theme.spacing(45)} maxWidth="90%">
            <Card>
              {school.director.name.length > 0 ? (
                <Link to="/school/server">
                  <CardActionArea>
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: theme.spacing(2),
                      }}
                    >
                      <Box>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          {school.director.name[0].toUpperCase()}
                        </Avatar>
                      </Box>
                      <Box display="flex" flexDirection="column">
                        <Typography
                          overflow="hidden"
                          whiteSpace="nowrap"
                          textOverflow="ellipses"
                        >
                          {adaptName(school.director.name)}
                        </Typography>
                        <Typography variant="caption">
                          {school.director.cpf} - Diretor(a)
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Link>
              ) : (
                <Link to="/school/define/diret">
                  <CardActionArea>
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: theme.spacing(2),
                      }}
                    >
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <Person />
                      </Avatar>
                      <Typography
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipses"
                      >
                        Definir Diretor
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              )}
            </Card>
          </Box>
        </Box>
      </Grid>
      <GridDashContent
        icon={<Group fontSize="large" />}
        quant={school.students}
        info={school.students === 1 ? "Aluno" : "Alunos"}
        dest="/school/student"
      />
      <GridDashContent
        icon={<Checklist fontSize="large" />}
        quant={school.frequencies === 0 ? "-" : school.frequencies}
        info={school.frequencies === 1 ? "Frequência" : "Frequências"}
        dest="/frequency/list"
        onClick={handleClickFrequency}
      />
      <GridDashContent
        icon={<School fontSize="large" />}
        quant={school.infrequency.toFixed(0) + "%"}
        info="Infrequência"
        dest="/school/class"
      />
      <GridDashOrgan />
    </Grid>
  );
};

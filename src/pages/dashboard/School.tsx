import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import { ReactNode } from "react";
import { useAppThemeContext } from "../../shared/contexts";
import { CalendarDashSchool, SelectSchoolData } from "../../shared/components";
import {
  Checklist,
  Close,
  EventBusy,
  Groups,
  People,
  Workspaces,
} from "@mui/icons-material";

interface iGridDashProps {
  icon: ReactNode;
  quant: number | string;
  info: string;
}

const GridDash = ({ icon, quant, info }: iGridDashProps) => {
  const theme = useTheme();
  return (
    <Grid item xs={4}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={0.5}
            >
              {icon}
              <Typography sx={{ fontSize: theme.spacing(4) }}>
                {quant}
              </Typography>
              <Typography
                component="div"
                display="flex"
                textAlign="center"
                alignItems="center"
                height={30}
                fontSize={theme.spacing(1.2)}
              >
                {info}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export const DashboardSchool = () => {
  const { theme } = useAppThemeContext();
  return (
    <LayoutBasePage title="Página Inicial">
      <Box
        my={1}
        mx={2}
        flexDirection="column"
        component={Paper}
        variant="outlined"
      >
        <Card>
          <CardContent>
            <Grid container direction="column" p={2} spacing={2}>
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                <Grid item xs={12} md={7}>
                  <Box
                    fontFamily={theme.typography.fontFamily}
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    gap={1}
                  >
                    <CalendarDashSchool />
                  </Box>
                </Grid>
                <Grid container item direction="row" xs={12} md={5} spacing={2}>
                  <Grid item xs={12}>
                    <SelectSchoolData />
                  </Grid>
                  <GridDash
                    icon={<Workspaces fontSize="large" />}
                    quant={4}
                    info="Turmas"
                  />
                  <GridDash
                    icon={<Groups fontSize="large" />}
                    quant={88}
                    info="Alunos"
                  />
                  <GridDash
                    icon={<Checklist fontSize="large" />}
                    quant={2}
                    info="Frequências"
                  />{" "}
                  <GridDash
                    icon={<EventBusy fontSize="large" />}
                    quant={"80%"}
                    info="Infrequência"
                  />
                  <GridDash
                    icon={<People fontSize="large" />}
                    quant={8}
                    info="Servidores"
                  />
                  <GridDash
                    icon={<Close fontSize="large" />}
                    quant={2}
                    info="Não enturmados"
                  />
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Box
                          display="flex"
                          justifyContent="space-evenly"
                          alignItems="center"
                          gap={1}
                        >
                          <img width="50%" src="/pref_massape.png" />
                          <img width="25%" src="/emtechs.jpg" />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </LayoutBasePage>
  );
};

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import { useAppThemeContext } from "../../shared/contexts";
import { iFrequency, iSchoolDash } from "../../shared/interfaces";

interface iFreqDashProps {
  freq: iFrequency;
}

const FreqDash = ({ freq }: iFreqDashProps) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent>
          <Typography gutterBottom>{freq.date}</Typography>
          <Typography gutterBottom>{freq.class.school.name}</Typography>
          <Typography gutterBottom>{freq.class.class.name}</Typography>
          <Typography gutterBottom>{freq._count.students} Alunos</Typography>
          <Typography gutterBottom>
            {String(freq.infrequency).replace(".", ",")}% de Infrequência
          </Typography>
          <Typography>{freq.user.name}</Typography>
          <Typography>{freq.user.cpf}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Reabrir</Button>
          <Button size="small">Saber Mais</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

interface iSchoolDashProps {
  school: iSchoolDash;
}

const SchoolDash = ({ school }: iSchoolDashProps) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent>
          <Typography
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipses"
            gutterBottom
          >
            {school.name}
          </Typography>
          <Typography gutterBottom>{school.total_students} Alunos</Typography>
          <Typography gutterBottom>
            {String(school.school_infreq).replace(".", ",")}% de Infrequência
          </Typography>
          <Typography>{school.classes[0].class.name}</Typography>
          <Typography>
            {String(school.classes[0].class_infreq).replace(".", ",")}% de
            Infrequência
          </Typography>
          {school.director && (
            <>
              <Typography>{school.director.name}</Typography>
              <Typography>{school.director.cpf}</Typography>
            </>
          )}
        </CardContent>
        <CardActions>
          <Button size="small">Saber Mais</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export const Dashboard = () => {
  const theme = useTheme();
  const mdLgBetween = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const { setLoading } = useAppThemeContext();
  const [listFreqData, setListFreqData] = useState<iFrequency[]>();
  const [listSchoolData, setListSchoolData] = useState<iSchoolDash[]>();

  useEffect(() => {
    setLoading(true);
    let take = 1;
    if (mdLgBetween) {
      take = 2;
    } else if (mdUp) {
      take = 3;
    }
    apiUsingNow
      .get<iFrequency[]>(`frequencies?status=CLOSED&take=${take}`)
      .then((res) => setListFreqData(res.data))
      .finally(() => setLoading(false));
    apiUsingNow
      .get<iSchoolDash[]>(`schools?is_dash=true&take=${take}`)
      .then((res) => {
        setListSchoolData(res.data);
        console.log(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <LayoutBasePage title="Página Inicial">
      <Box
        m={2}
        display="flex"
        flexDirection="column"
        component={Paper}
        variant="outlined"
      >
        <Card>
          <CardContent>
            <Grid container direction="column" p={2} spacing={2}>
              <Typography variant="h6">Últimas Frequências</Typography>
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                {listFreqData &&
                  listFreqData.map((el) => <FreqDash key={el.id} freq={el} />)}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button>Saber Mais</Button>
          </CardActions>
        </Card>
      </Box>
      <Box
        m={2}
        display="flex"
        flexDirection="column"
        component={Paper}
        variant="outlined"
      >
        <Card>
          <CardContent>
            <Grid container direction="column" p={2} spacing={2}>
              <Typography variant="h6">Alerta Escolas</Typography>
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                {listSchoolData &&
                  listSchoolData.map((el) => (
                    <SchoolDash key={el.id} school={el} />
                  ))}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button>Saber Mais</Button>
          </CardActions>
        </Card>
      </Box>
    </LayoutBasePage>
  );
};

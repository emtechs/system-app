import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import { ReactNode, useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import { useAppThemeContext, useAuthContext } from "../../shared/contexts";
import {
  iClassWithSchool,
  iFrequencyWithInfreq,
  iSchoolWithStudents,
  iStudentDash,
} from "../../shared/interfaces";
import { CalendarDashSchool, SelectSchoolData } from "../../shared/components";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useNavigate } from "react-router-dom";
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

interface iFreqDashProps {
  freq: iFrequencyWithInfreq;
}

const FreqDash = ({ freq }: iFreqDashProps) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent>
          <Typography gutterBottom>{freq.date}</Typography>
          <Typography
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipses"
            gutterBottom
          >
            {freq.class.school.name}
          </Typography>
          <Typography gutterBottom>{freq.class.class.name}</Typography>
          <Typography gutterBottom>{freq._count.students} Alunos</Typography>
          <Typography gutterBottom>
            {String(freq.infrequency).replace(".", ",")}% de Infrequência
          </Typography>
          <Typography>{freq.user.name}</Typography>
          <Typography gutterBottom>{freq.user.cpf}</Typography>
          <Typography variant="caption">
            {freq.finished_at
              ? dayjs(freq.finished_at).fromNow()
              : dayjs(freq.created_at).fromNow()}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

interface iClassDashAlertProps {
  classData: iClassWithSchool;
}

const ClassDashAlert = ({ classData }: iClassDashAlertProps) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardActionArea
          onClick={() =>
            navigate(
              `/class/${classData.class.id}/${classData.school.id}/${classData.year.id}`
            )
          }
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom>{classData.class.name}</Typography>
            <Typography gutterBottom>
              {classData._count.students} Alunos
            </Typography>
            <Typography>
              {String(classData.infrequency).replace(".", ",")}% de Infrequência
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

interface iStudentAlertProps {
  student: iStudentDash;
}

const StudentAlert = ({ student }: iStudentAlertProps) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom>{student.registry}</Typography>
          <Typography
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipses"
            gutterBottom
          >
            {student.name}
          </Typography>
          <Typography gutterBottom>
            {String(student.infrequency).replace(".", ",")}% de Infrequência
          </Typography>
          <Typography>{student.class.name}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const DashboardSchool = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const mdLgBetween = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const { setLoading } = useAppThemeContext();
  const { schoolData, yearId } = useAuthContext();
  const [listFreqData, setListFreqData] = useState<iFrequencyWithInfreq[]>();
  const [listFreqOpenData, setListFreqOpenData] =
    useState<iFrequencyWithInfreq[]>();
  const [listAlertClassData, setListAlertClassData] =
    useState<iClassWithSchool[]>();
  const [listAlertStudentData, setListAlertStudentData] =
    useState<iStudentDash[]>();

  useEffect(() => {
    let take = 1;
    if (mdLgBetween) {
      take = 2;
    } else if (mdUp) {
      take = 3;
    }

    setLoading(true);
    apiUsingNow
      .get<{ result: iFrequencyWithInfreq[] }>(
        `frequencies?status=CLOSED&take=${take}&is_infreq=true`
      )
      .then((res) => setListFreqData(res.data.result))
      .finally(() => setLoading(false));

    setLoading(true);
    apiUsingNow
      .get<{ result: iFrequencyWithInfreq[] }>(
        `frequencies?is_dash=true&take=${take}`
      )
      .then((res) => setListFreqOpenData(res.data.result))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (schoolData && yearId) {
      let take = 1;
      if (mdLgBetween) {
        take = 2;
      } else if (mdUp) {
        take = 3;
      }
      setLoading(true);
      apiUsingNow
        .get<iClassWithSchool[]>(
          `classes/${schoolData.school.id}?year_id=${yearId}&class_infreq=1&take=${take}`
        )
        .then((res) => setListAlertClassData(res.data))
        .finally(() => setLoading(false));
      setLoading(true);
      apiUsingNow
        .get<iSchoolWithStudents>(
          `schools/${schoolData.school.id}?year_id=${yearId}`
        )
        .then((res) => {
          const students = res.data.students;
          if (students.length <= take) {
            setListAlertStudentData(students);
          } else {
            setListAlertStudentData(students.slice(0, take));
          }
        })
        .finally(() => setLoading(false));
    }
  }, [schoolData, yearId]);

  return (
    <LayoutBasePage title="Página Inicial" school={<SelectSchoolData />}>
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
              <Typography variant="h6">Frequências Em Aberto</Typography>
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                {listFreqOpenData &&
                  listFreqOpenData.map((el) => (
                    <FreqDash key={el.id} freq={el} />
                  ))}
              </Grid>
            </Grid>
          </CardContent>
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
              <Typography variant="h6">Alerta Turmas</Typography>
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                {listAlertClassData && listAlertClassData.length > 0 ? (
                  listAlertClassData.map((el) => (
                    <ClassDashAlert key={el.class.id} classData={el} />
                  ))
                ) : (
                  <Typography m={2}>
                    Nenhuma tuma com infrequência no momento!
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              onClick={() => {
                navigate(`/class/list/${schoolData?.school.id}/${yearId}`);
              }}
            >
              Saber Mais
            </Button>
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
              <Typography variant="h6">Alerta Alunos</Typography>
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                {listAlertStudentData && listAlertStudentData.length > 0 ? (
                  listAlertStudentData.map((el) => (
                    <StudentAlert key={el.id} student={el} />
                  ))
                ) : (
                  <Typography m={2}>
                    Nenhum aluno infrequente no momento!
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </LayoutBasePage>
  );
};

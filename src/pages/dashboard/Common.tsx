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
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import {
  useAppThemeContext,
  useAuthContext,
  useFrequencyContext,
} from "../../shared/contexts";
import {
  iClassDash,
  iClassWithSchool,
  iFrequency,
  iSchoolWithStudents,
  iStudentDash,
} from "../../shared/interfaces";
import { SelectSchoolData } from "../../shared/components";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useNavigate } from "react-router-dom";

interface iClassDashProps {
  classData: iClassDash;
}

const ClassDash = ({ classData }: iClassDashProps) => {
  const { createFrequency } = useFrequencyContext();
  const date = dayjs().format("DD/MM/YYYY");
  const month = +date.split("/")[1];
  const day = +date.split("/")[0];
  const students = classData.students.map(({ student }) => {
    return { student_id: student.id };
  });

  return (
    <Grid item xs={12} md={6} lg={3}>
      <Card>
        <CardActionArea
          onClick={() =>
            createFrequency({
              date,
              month,
              day,
              class_id: classData.class.id,
              school_id: classData.school.id,
              year_id: classData.year.id,
              students,
            })
          }
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography>{classData.class.name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

interface iFreqOpenDashProps {
  freq: iFrequency;
}

const FreqOpenDash = ({ freq }: iFreqOpenDashProps) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Card>
        <CardActionArea onClick={() => navigate(`/frequency/${freq.id}`)}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom>{freq.date}</Typography>
            <Typography gutterBottom>{freq.class.class.name}</Typography>
            <Typography>{freq._count.students} Alunos</Typography>
          </CardContent>
        </CardActionArea>
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

export const DashboardCommon = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const mdLgBetween = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const { setLoading } = useAppThemeContext();
  const { schoolData, yearId } = useAuthContext();
  const [listClassData, setListClassData] = useState<iClassDash[]>();
  const [listFreqData, setListFreqData] = useState<iFrequency[]>();
  const [listAlertClassData, setListAlertClassData] =
    useState<iClassWithSchool[]>();
  const [listAlertStudentData, setListAlertStudentData] =
    useState<iStudentDash[]>();

  useEffect(() => {
    if (schoolData) {
      const date = dayjs().format("DD/MM/YYYY");
      setLoading(true);
      apiUsingNow
        .get<iClassDash[]>(
          `classes/${schoolData.school.id}?is_dash=true&date=${date}`
        )
        .then((res) => setListClassData(res.data))
        .finally(() => setLoading(false));
      setLoading(true);
      apiUsingNow
        .get<iFrequency[]>(`frequencies?school_id=${schoolData.school.id}`)
        .then((res) => setListFreqData(res.data))
        .finally(() => setLoading(false));
    }
  }, [schoolData]);

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
        display="flex"
        flexDirection="column"
        component={Paper}
        variant="outlined"
      >
        <Card>
          <CardContent>
            <Grid container direction="column" p={2} spacing={2}>
              <Typography variant="h6">Realizar Frequência</Typography>
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                {listClassData &&
                  listClassData.map((el) => (
                    <ClassDash key={el.class.id} classData={el} />
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
              <Typography variant="h6">Frequências Em Aberto</Typography>
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                {listFreqData && listFreqData.length > 0 ? (
                  listFreqData.map((el) => (
                    <FreqOpenDash key={el.id} freq={el} />
                  ))
                ) : (
                  <Typography m={2}>
                    Nenhuma frequência em aberto no momento!
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button onClick={() => navigate("/frequency/list")}>
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
              onClick={() =>
                navigate(`/class/list/${schoolData?.school.id}/${yearId}`)
              }
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

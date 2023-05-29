import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { BasePage } from "../../shared/components";
import {
  useAppThemeContext,
  useClassContext,
  useSchoolContext,
} from "../../shared/contexts";
import {
  iFrequencyStudentsWithInfreq,
  iFrequencyWithInfreq,
  iPageProps,
  iStatusStudent,
} from "../../shared/interfaces";
import { useEffect, useState } from "react";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { apiUsingNow } from "../../shared/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { frequencyUpdateSchema } from "../../shared/schemas";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { useParams } from "react-router-dom";
dayjs.locale("pt-br");
dayjs.extend(relativeTime);

interface iCardFrequencyProps {
  student: iFrequencyStudentsWithInfreq;
  theme: Theme;
}

const statusFrequencyPtBr = (status: iStatusStudent) => {
  switch (status) {
    case "PRESENTED":
      return "Presente";

    case "MISSED":
      return "Faltou";

    case "JUSTIFIED":
      return "Justificou";
  }
};

const defineBgColor = (status: iStatusStudent, theme: Theme) => {
  switch (status) {
    case "PRESENTED":
      return theme.palette.success.main;

    case "MISSED":
      return theme.palette.error.main;

    case "JUSTIFIED":
      return theme.palette.warning.dark;
  }
};

const CardFrequency = ({ student, theme }: iCardFrequencyProps) => {
  const { updateFrequencyStudent, studentData, setStudentData } =
    useSchoolContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setStudentData(student);
    setOpen(!open);
  };
  return (
    <>
      <Card
        sx={{
          width: "100%",
          height: 80,
          maxWidth: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: defineBgColor(student.status, theme),
        }}
      >
        <CardContent
          onClick={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar>{student.name[0].toUpperCase()}</Avatar>
            <Box>
              <Typography
                fontSize={10}
                color={theme.palette.secondary.contrastText}
              >
                {student.registry}
              </Typography>
              <Typography color={theme.palette.secondary.contrastText}>
                {student.name}
              </Typography>
            </Box>
            <Typography fontSize={8} color={theme.palette.grey[300]}>
              {statusFrequencyPtBr(student.status)}
            </Typography>
          </Box>
          {student.updated_at && (
            <Typography
              sx={{ position: "absolute", bottom: 4, right: 4 }}
              fontSize={7}
              color={theme.palette.grey[400]}
            >
              {dayjs(student.updated_at).fromNow()}
            </Typography>
          )}
        </CardContent>
      </Card>
      {studentData && (
        <Dialog open={open} onClose={handleClose}>
          {studentData.status === "PRESENTED" ? (
            <>
              <DialogTitle>Informar Falta</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Você está cadastrando a falta para o aluno {studentData.name}.
                  No campo abaixo, preencha a justificativa da falta caso o
                  aluno tenha justificado. Caso contrário, clique no botão
                  "Faltou".
                </DialogContentText>
                <FormContainer
                  onSuccess={(data) => {
                    updateFrequencyStudent(
                      data,
                      studentData.frequencyStudent_id
                    );
                    setOpen(!open);
                  }}
                  resolver={zodResolver(frequencyUpdateSchema)}
                >
                  <Box mt={1} display="flex" flexDirection="column" gap={1}>
                    <Typography>Matrícula: {studentData.registry}</Typography>
                    <Typography>Aluno: {studentData.name}</Typography>
                    <TextFieldElement
                      name="justification"
                      label="Justificativa"
                      required
                      fullWidth
                      margin="dense"
                    />
                    <Button variant="contained" type="submit" fullWidth>
                      Salvar
                    </Button>
                  </Box>
                </FormContainer>
                <DialogActions>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button
                    onClick={() => {
                      updateFrequencyStudent(
                        { status: "MISSED", updated_at: dayjs().format() },
                        studentData.frequencyStudent_id
                      );
                      setOpen(!open);
                    }}
                  >
                    Faltou
                  </Button>
                </DialogActions>
              </DialogContent>
            </>
          ) : (
            <>
              <DialogTitle>Retirar Falta</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Deseja continuar removendo a falta do aluno {studentData.name}
                  ?
                </DialogContentText>
                <Box mt={1} display="flex" flexDirection="column" gap={1}>
                  <Typography>Matrícula: {studentData.registry}</Typography>
                  <Typography>Aluno: {studentData.name}</Typography>
                  {studentData.justification && (
                    <Typography>
                      Justificativa: {studentData.justification}
                    </Typography>
                  )}
                </Box>
                <DialogActions>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button
                    onClick={() => {
                      updateFrequencyStudent(
                        {
                          status: "PRESENTED",
                          justification: "",
                          updated_at: dayjs().format(),
                        },
                        studentData.frequencyStudent_id
                      );
                      setOpen(!open);
                    }}
                  >
                    Continuar
                  </Button>
                </DialogActions>
              </DialogContent>
            </>
          )}
        </Dialog>
      )}
    </>
  );
};

export const RetrieveFrequency = ({ back }: iPageProps) => {
  const theme = useTheme();
  const { id } = useParams<"id">();
  const { setLoading } = useAppThemeContext();
  const { updateFrequency, updateStudent, studentData, schoolYear } =
    useSchoolContext();
  const { updateClassSchool } = useClassContext();
  const [retrieveFreq, setRetrieveFreq] = useState<iFrequencyWithInfreq>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iFrequencyWithInfreq>(
        `frequencies/${id}?school_year_id=${schoolYear}`
      )
      .then((res) => {
        setRetrieveFreq(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iFrequencyWithInfreq>(
        `frequencies/${id}?school_year_id=${schoolYear}`
      )
      .then((res) => {
        setRetrieveFreq(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [studentData]);
  return (
    <BasePage isProfile back={back}>
      {retrieveFreq && (
        <Box display="flex" flexDirection="column" gap={theme.spacing(2)}>
          <Card
            sx={{
              width: "100%",
              height: 80,
              maxWidth: 250,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography>{retrieveFreq.date}</Typography>
              <Typography>{retrieveFreq.class.class.name}</Typography>
            </CardContent>
          </Card>
          {retrieveFreq.students.map((student) => (
            <CardFrequency key={student.id} student={student} theme={theme} />
          ))}
          <Button
            variant="contained"
            onClick={() => {
              updateFrequency(
                { status: "CLOSED", finished_at: Date.now() },
                retrieveFreq.id
              );
              retrieveFreq.students.forEach((el) => {
                updateStudent({ infreq: el.infrequency }, el.id);
              });
              updateClassSchool(
                {
                  class_id: retrieveFreq.class.class.id,
                  school_id: retrieveFreq.class.school.id,
                  school_year_id: retrieveFreq.class.school_year.id,
                  class_infreq: retrieveFreq.class_infreq
                    ? retrieveFreq.class_infreq
                    : 0,
                  school_infreq: retrieveFreq.school_infreq
                    ? retrieveFreq.school_infreq
                    : 0,
                },
                back
              );
            }}
            fullWidth
          >
            Salvar
          </Button>
        </Box>
      )}
    </BasePage>
  );
};

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
import { useAppThemeContext, useSchoolContext } from "../../shared/contexts";
import {
  iFrequency,
  iFrequencyStudents,
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
dayjs.locale("pt-br");
dayjs.extend(relativeTime);

interface iCardFrequencyProps {
  frequency: iFrequencyStudents;
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

const CardFrequency = ({ frequency, theme }: iCardFrequencyProps) => {
  const { updateFrequencyStudent, studentData, setStudentData } =
    useSchoolContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setStudentData(frequency);
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
          bgcolor: defineBgColor(frequency.status, theme),
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
            <Avatar>{frequency.student.name[0].toUpperCase()}</Avatar>
            <Box>
              <Typography
                fontSize={10}
                color={theme.palette.secondary.contrastText}
              >
                {frequency.student.registry}
              </Typography>
              <Typography color={theme.palette.secondary.contrastText}>
                {frequency.student.name}
              </Typography>
            </Box>
            <Typography fontSize={8} color={theme.palette.grey[300]}>
              {statusFrequencyPtBr(frequency.status)}
            </Typography>
          </Box>
          {frequency.updated_at && (
            <Typography
              sx={{ position: "absolute", bottom: 4, right: 4 }}
              fontSize={7}
              color={theme.palette.grey[400]}
            >
              {dayjs(frequency.updated_at).fromNow()}
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
                  Você está cadastrando a falta para o aluno{" "}
                  {studentData.student.name}. No campo abaixo, preencha a
                  justificativa da falta caso o aluno tenha justificado. Caso
                  contrário, clique no botão "Faltou".
                </DialogContentText>
                <FormContainer
                  onSuccess={(data) => {
                    updateFrequencyStudent(data, studentData.id);
                    setOpen(!open);
                  }}
                  resolver={zodResolver(frequencyUpdateSchema)}
                >
                  <Box mt={1} display="flex" flexDirection="column" gap={1}>
                    <Typography>
                      Matrícula: {studentData.student.registry}
                    </Typography>
                    <Typography>Aluno: {studentData.student.name}</Typography>
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
                        studentData.id
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
                  Deseja continuar removendo a falta do aluno{" "}
                  {studentData.student.name}?
                </DialogContentText>
                <Box mt={1} display="flex" flexDirection="column" gap={1}>
                  <Typography>
                    Matrícula: {studentData.student.registry}
                  </Typography>
                  <Typography>Aluno: {studentData.student.name}</Typography>
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
                        studentData.id
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
  const { setLoading } = useAppThemeContext();
  const { frequencyData, setFrequencyData, updateFrequency, studentData } =
    useSchoolContext();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iFrequency>(`frequencies/${frequencyData?.id}`)
      .then((res) => {
        setFrequencyData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [studentData]);
  return (
    <BasePage isProfile back={back}>
      {frequencyData && (
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
              <Typography>{frequencyData.date}</Typography>
              <Typography>{frequencyData.class.name}</Typography>
            </CardContent>
          </Card>
          {frequencyData.students.map((frequency) => (
            <CardFrequency
              key={frequency.id}
              frequency={frequency}
              theme={theme}
            />
          ))}
          <Button
            variant="contained"
            onClick={() => {
              updateFrequency(
                { status: "CLOSED", finished_at: Date.now() },
                frequencyData.id,
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

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
import { BasePage, Glossary } from "../../shared/components";
import {
  useAppThemeContext,
  useModalProfileContext,
  useSchoolContext,
} from "../../shared/contexts";
import {
  iFrequency,
  iFrequencyStudents,
  iStatusStudent,
} from "../../shared/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  studentData: iFrequencyStudents | undefined;
  setStudentData: Dispatch<SetStateAction<iFrequencyStudents | undefined>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
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

const CardFrequency = ({
  frequency,
  theme,
  studentData,
  setStudentData,
  open,
  setOpen,
}: iCardFrequencyProps) => {
  const { updateFrequencyStudent } = useSchoolContext();
  const handleClose = () => setOpen(!open);
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
          bgcolor:
            frequency.status === "PRESENTED"
              ? theme.palette.success.main
              : theme.palette.error.main,
        }}
      >
        <CardContent
          onClick={() => {
            setStudentData(frequency);
            setOpen(true);
          }}
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
                    setOpen(false);
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
                      setOpen(false);
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
                      setOpen(false);
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

export const Frequency = () => {
  const theme = useTheme();
  const { setLoading } = useAppThemeContext();
  const { frequencyData, setFrequencyData, updateFrequency } =
    useSchoolContext();
  const { openGlossary, handleOpenGlossary } = useModalProfileContext();
  const [studentData, setStudentData] = useState<iFrequencyStudents>();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iFrequency>(`frequencies/${frequencyData?.id}`)
      .then((res) => {
        setFrequencyData(res.data);
        setLoading(false);
      });
  }, [open]);
  return (
    <>
      <BasePage isProfile>
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
                studentData={studentData}
                setStudentData={setStudentData}
                open={open}
                setOpen={setOpen}
              />
            ))}
            <Button
              variant="contained"
              onClick={() => {
                updateFrequency({ status: "CLOSED" }, frequencyData.id);
              }}
              fullWidth
            >
              Salvar
            </Button>
          </Box>
        )}
      </BasePage>
      <Glossary open={openGlossary} onClose={handleOpenGlossary}>
        <></>
      </Glossary>
    </>
  );
};

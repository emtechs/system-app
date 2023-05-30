import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TableCell,
  TableRow,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  TableRetrieveFrequency,
  ToolsFrequency,
} from "../../shared/components";
import {
  useAppThemeContext,
  useFrequencyContext,
  useSchoolContext,
} from "../../shared/contexts";
import {
  iFrequencyStudentsWithInfreq,
  iFrequencyWithInfreq,
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
import { LayoutBasePage } from "../../shared/layouts";
import { Checklist } from "@mui/icons-material";
import { CardSchool } from "../../shared/components/card";
dayjs.locale("pt-br");
dayjs.extend(relativeTime);

interface iCardFrequencyProps {
  student: iFrequencyStudentsWithInfreq;
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

const defineColor = (status: iStatusStudent) => {
  switch (status) {
    case "PRESENTED":
      return "success";

    case "MISSED":
      return "error";

    case "JUSTIFIED":
      return "warning";
  }
};

const CardFrequency = ({ student }: iCardFrequencyProps) => {
  const theme = useTheme();
  const { updateFrequencyStudent, studentData, setStudentData } =
    useFrequencyContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setStudentData(student);
    setOpen(!open);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Tooltip title="Mudar Estado da Presença">
            <IconButton
              onClick={handleClose}
              color={defineColor(student.status)}
            >
              <Checklist />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>{student.registry}</TableCell>
        <TableCell>{student.name}</TableCell>
        <TableCell
          sx={{
            bgcolor: defineBgColor(student.status, theme),
            color: theme.palette.secondary.contrastText,
          }}
        >
          {statusFrequencyPtBr(student.status)}
        </TableCell>
        <TableCell>{String(student.infrequency).replace(".", ",")}%</TableCell>
        <TableCell>
          {student.updated_at ? dayjs(student.updated_at).fromNow() : "-"}
        </TableCell>
      </TableRow>
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

export const RetrieveFrequency = () => {
  const { id } = useParams<"id">();
  const { setLoading } = useAppThemeContext();
  const { schoolYear } = useSchoolContext();
  const { studentData, retrieveFreq, setRetrieveFreq } = useFrequencyContext();

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
    <LayoutBasePage
      school={<CardSchool />}
      tools={<ToolsFrequency />}
      title={
        retrieveFreq
          ? `${retrieveFreq.date} - ${retrieveFreq.class.class.name}`
          : "Realizar Frequência"
      }
    >
      {retrieveFreq && (
        <TableRetrieveFrequency>
          <>
            {retrieveFreq.students.map((el) => (
              <CardFrequency key={el.id} student={el} />
            ))}
          </>
        </TableRetrieveFrequency>
      )}
    </LayoutBasePage>
  );
};

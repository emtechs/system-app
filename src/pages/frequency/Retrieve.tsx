import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import {
  DialogMissed,
  DialogRemoveMissed,
  Tools,
} from "../../shared/components";
import { useFrequencyContext, useTableContext } from "../../shared/contexts";
import { iFrequency, iFrequencyStudents } from "../../shared/interfaces";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { Navigate, useSearchParams } from "react-router-dom";
import { LayoutBasePage } from "../../shared/layouts";
import { CardSchool } from "../../shared/components/card";
import {
  defineBgColorFrequency,
  statusFrequencyPtBr,
} from "../../shared/scripts";
dayjs.locale("pt-br");
dayjs.extend(relativeTime);

interface iCardFrequencyProps {
  student: iFrequencyStudents;
}

const CardFrequency = ({ student }: iCardFrequencyProps) => {
  const theme = useTheme();
  const { studentData, setStudentData } = useFrequencyContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(!open);

  return (
    <>
      <TableRow
        hover
        onClick={() => {
          setStudentData(student);
          setOpen(true);
        }}
        sx={{ cursor: "pointer", height: theme.spacing(10) }}
      >
        <TableCell>{student.student.registry}</TableCell>
        <TableCell>{student.student.name}</TableCell>
        <TableCell
          sx={{
            bgcolor: defineBgColorFrequency(student.status, theme),
            color: theme.palette.secondary.contrastText,
          }}
        >
          {statusFrequencyPtBr(student.status)}
        </TableCell>
        <TableCell>
          {student.updated_at ? dayjs(student.updated_at).fromNow() : "-"}
        </TableCell>
      </TableRow>
      {studentData?.status === "PRESENTED" ? (
        <DialogMissed open={open} onClose={handleClose} student={studentData} />
      ) : (
        studentData && (
          <DialogRemoveMissed
            open={open}
            onClose={handleClose}
            student={studentData}
          />
        )
      )}
    </>
  );
};

export const RetrieveFrequencyPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { setIsLoading, isLoading } = useTableContext();
  const { frequencyData, setFrequencyData, studentData } =
    useFrequencyContext();

  useEffect(() => {
    return setFrequencyData(undefined);
  }, []);

  useEffect(() => {
    if (id && !studentData) {
      setIsLoading(true);
      apiUsingNow
        .get<iFrequency>(`frequencies/${id}`)
        .then((res) => setFrequencyData(res.data))
        .finally(() => setIsLoading(false));
    }
  }, [studentData, id]);

  if (!id) {
    return <Navigate to={"/frequency/create"} />;
  }

  return (
    <LayoutBasePage
      school={<CardSchool />}
      tools={<Tools isHome isFinish />}
      title={
        frequencyData
          ? `${frequencyData.date} - ${frequencyData.class.class.name}`
          : "Realizar Frequência"
      }
    >
      <TableContainer
        sx={{ mx: 2, mt: 1, width: "auto" }}
        component={Paper}
        variant="outlined"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Matrícula</TableCell>
              <TableCell>Aluno</TableCell>
              <TableCell>Estado da Presença</TableCell>
              <TableCell>Atualizado Em</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {frequencyData?.students.map((el) => (
              <CardFrequency key={el.id} student={el} />
            ))}
          </TableBody>
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBasePage>
  );
};

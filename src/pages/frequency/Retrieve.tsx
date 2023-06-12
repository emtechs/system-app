import { TableCell, TableRow, useTheme } from "@mui/material";
import {
  DialogMissed,
  DialogRemoveMissed,
  TableBase,
  Tools,
} from "../../shared/components";
import { useFrequencyContext, useTableContext } from "../../shared/contexts";
import {
  iFrequency,
  iFrequencyStudents,
  iheadCell,
} from "../../shared/interfaces";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { useParams } from "react-router-dom";
import { LayoutBasePage } from "../../shared/layouts";
import { CardSchool } from "../../shared/components/card";
import {
  defineBgColorFrequency,
  statusFrequencyPtBr,
} from "../../shared/scripts";
dayjs.locale("pt-br");
dayjs.extend(relativeTime);

const headCells: iheadCell[] = [
  { order: "date", numeric: false, label: "Matrícula" },
  { order: "name", numeric: false, label: "Aluno" },
  { numeric: true, label: "Estado da Presença" },
  { order: "name", numeric: false, label: "Atualizado Em" },
];

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
  const { id } = useParams<"id">();
  const { setIsLoading, setCount } = useTableContext();
  const { studentData, frequencyData, setFrequencyData } =
    useFrequencyContext();

  useEffect(() => {
    setIsLoading(true);
    apiUsingNow
      .get<iFrequency>(`frequencies/${id}`)
      .then((res) => {
        setCount(1);
        setFrequencyData(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [studentData]);

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
      <TableBase headCells={headCells} is_pagination={false}>
        {frequencyData?.students.map((el) => (
          <CardFrequency key={el.id} student={el} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};

import { TableCell, TableRow, useTheme } from "@mui/material";
import {
  DialogMissed,
  DialogRemoveMissed,
  TableRetrieveFrequency,
  ToolsCommon,
} from "../../shared/components";
import { useAppThemeContext, useFrequencyContext } from "../../shared/contexts";
import { iFrequency, iFrequencyStudents } from "../../shared/interfaces";
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

interface iCardFrequencyProps {
  student: iFrequencyStudents;
}

const CardFrequency = ({ student }: iCardFrequencyProps) => {
  const theme = useTheme();
  const { studentData, setStudentData } = useFrequencyContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!open);
    setStudentData(undefined);
  };

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

export const RetrieveFrequency = () => {
  const { id } = useParams<"id">();
  const { setLoading } = useAppThemeContext();
  const { studentData, frequencyData, setFrequencyData } =
    useFrequencyContext();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iFrequency>(`frequencies/${id}`)
      .then((res) => {
        setFrequencyData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iFrequency>(`frequencies/${id}`)
      .then((res) => {
        setFrequencyData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [studentData]);

  return (
    <LayoutBasePage
      school={<CardSchool />}
      tools={<ToolsCommon isHome isFinish />}
      title={
        frequencyData
          ? `${frequencyData.date} - ${frequencyData.class.class.name}`
          : "Realizar Frequência"
      }
    >
      {frequencyData && (
        <TableRetrieveFrequency>
          <>
            {frequencyData.students.map((el) => (
              <CardFrequency key={el.id} student={el} />
            ))}
          </>
        </TableRetrieveFrequency>
      )}
    </LayoutBasePage>
  );
};

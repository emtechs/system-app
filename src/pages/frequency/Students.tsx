import { Box, TableCell, TableRow, useTheme } from "@mui/material";
import { TableBase, Tools } from "../../shared/components";
import {
  useFrequencyContext,
  usePaginationContext,
} from "../../shared/contexts";
import {
  iFrequencyBase,
  iFrequencyStudentsBase,
  iheadCell,
} from "../../shared/interfaces";
import { useEffect, useState } from "react";
import { apiFrequency } from "../../shared/services";
import { Navigate, useSearchParams } from "react-router-dom";
import { LayoutBasePage } from "../../shared/layouts";
import {
  defineBgColorFrequency,
  statusFrequencyPtBr,
} from "../../shared/scripts";

const headCells: iheadCell[] = [
  { order: "registry", numeric: false, label: "Matrícula" },
  { order: "name", numeric: false, label: "Aluno" },
  { numeric: false, label: "Estado da Presença" },
];

interface iCardFrequencyProps {
  student: iFrequencyStudentsBase;
}

const CardFrequency = ({ student }: iCardFrequencyProps) => {
  const theme = useTheme();

  return (
    <TableRow>
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
    </TableRow>
  );
};

export const StudentFrequencyPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { dataStudents, setDataStudents } = useFrequencyContext();
  const { setIsLoading, defineQuery, setCount } = usePaginationContext();
  const [dataFrequency, setDataFrequency] = useState<iFrequencyBase>();

  useEffect(() => {
    setDataStudents(undefined);
  }, []);

  useEffect(() => {
    if (id) {
      const queryData = defineQuery();
      setIsLoading(true);
      apiFrequency
        .students(id, queryData)
        .then((res) => {
          setCount(res.total);
          setDataFrequency(res.frequency);
          setDataStudents(res.result);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, open, defineQuery]);

  if (!id) {
    return <Navigate to={"/frequency/list"} />;
  }

  return (
    <LayoutBasePage
      isSchool
      tools={<Tools isSingle />}
      title={
        dataFrequency
          ? `${dataFrequency.date} - ${dataFrequency.class.class.name}`
          : "Alunos da Frequência"
      }
    >
      <TableBase headCells={headCells}>
        {dataStudents?.map((el) => (
          <CardFrequency key={el.id} student={el} />
        ))}
      </TableBase>
      <Box height={20} />
    </LayoutBasePage>
  );
};

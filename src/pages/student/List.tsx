import { iStudentList, iheadCell } from "../../shared/interfaces";
import {
  useAuthContext,
  useFrequencyContext,
  useTableContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { TableBase, Tools } from "../../shared/components";
import { TableCell, TableRow, useTheme } from "@mui/material";
import { defineBgColorInfrequency } from "../../shared/scripts";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Matrícula" },
  { order: "director_name", numeric: false, label: "Aluno" },
  { numeric: false, label: "Turma" },
  { numeric: false, label: "Escola" },
  { order: "infreq", numeric: true, label: "Infrequência" },
];

interface iCardStudentProps {
  student: iStudentList;
}
const CardStudent = ({ student }: iCardStudentProps) => {
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell>{student.registry}</TableCell>
      <TableCell>{student.name}</TableCell>
      {student.classes && student.classes.length > 0 && (
        <>
          <TableCell>{student.classes[0].class.class.name}</TableCell>
          <TableCell>{student.classes[0].class.school.name}</TableCell>
        </>
      )}
      <TableCell
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(student.infreq, theme),
        }}
      >
        {String(student.infreq).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const ListStudentPage = () => {
  const { yearId } = useAuthContext();
  const { isInfreq } = useFrequencyContext();
  const { setCount, take, skip, setIsLoading } = useTableContext();
  const [data, setData] = useState<iStudentList[]>();

  useEffect(() => {
    if (yearId) {
      let query = `?is_list=true&year_id=${yearId}`;
      if (isInfreq) query += "&infreq=31";
      if (take) query += `&take=${take}`;
      if (skip) query += `&skip=${skip}`;
      setIsLoading(true);
      apiUsingNow
        .get<{ total: number; result: iStudentList[] }>(`students${query}`)
        .then((res) => {
          setData(res.data.result);
          setCount(res.data.total);
        })
        .finally(() => setIsLoading(false));
    }
  }, [yearId, isInfreq, take, skip]);

  return (
    <LayoutBasePage
      title={"Listagem de Alunos"}
      tools={<Tools isHome isFreq />}
    >
      <TableBase headCells={headCells}>
        {data?.map((student) => (
          <CardStudent key={student.id} student={student} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};

import { iStudent, iheadCell } from "../../shared/interfaces";
import {
  useAppThemeContext,
  useAuthContext,
  useFrequencyContext,
  usePaginationContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { TableBase, Tools } from "../../shared/components";
import { TableCell, TableRow } from "@mui/material";
import { defineBgColorInfrequency } from "../../shared/scripts";

const headCells: iheadCell[] = [
  { order: "registry", numeric: false, label: "Matrícula" },
  { order: "name", numeric: false, label: "Aluno" },
  { order: "class_name", numeric: false, label: "Turma" },
  { order: "school_name", numeric: false, label: "Escola" },
  { order: "infreq", numeric: true, label: "Infrequência" },
];

interface iCardStudentProps {
  classStudent: iStudent;
}
const CardStudent = ({ classStudent }: iCardStudentProps) => {
  const { theme } = useAppThemeContext();

  return (
    <TableRow>
      <TableCell>{classStudent.registry}</TableCell>
      <TableCell>{classStudent.name}</TableCell>

      {/* <TableCell>{classStudent.class.class.name}</TableCell>
      <TableCell>{classStudent.class.school.name}</TableCell> */}

      <TableCell
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(classStudent.infrequency, theme),
        }}
      >
        {String(classStudent.infrequency).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const ListStudentPage = () => {
  const { yearData } = useAuthContext();
  const { isInfreq } = useFrequencyContext();
  const { setCount, setIsLoading, defineQuery } = usePaginationContext();
  const [data, setData] = useState<iStudent[]>();

  useEffect(() => {
    if (yearData) {
      let query = defineQuery();
      if (isInfreq) query += "&infreq=31";
      setIsLoading(true);
      apiUsingNow
        .get<{ total: number; result: iStudent[] }>(
          `classes/student/${yearData.id}${query}`
        )
        .then((res) => {
          setData(res.data.result);
          setCount(res.data.total);
        })
        .finally(() => setIsLoading(false));
    }
  }, [yearData, isInfreq, defineQuery]);

  return (
    <LayoutBasePage title={"Listagem de Alunos"} tools={<Tools isHome />}>
      <TableBase headCells={headCells}>
        {data?.map((classStudent) => (
          <CardStudent
            key={classStudent.id}
            classStudent={classStudent}
          />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};

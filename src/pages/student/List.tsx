import { iStudent } from "../../shared/interfaces";
import {
  useAppThemeContext,
  usePaginationContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { TableStudent, Tools } from "../../shared/components";
import { TableCell, TableRow, useTheme } from "@mui/material";
import { defineBgColorInfrequency } from "../../shared/scripts";

interface iCardStudentProps {
  student: iStudent;
}
const CardStudent = ({ student }: iCardStudentProps) => {
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell>{student.registry}</TableCell>
      <TableCell>{student.name}</TableCell>
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
  const { setLoading } = useAppThemeContext();
  const { setCount, take, skip } = usePaginationContext();
  const [data, setData] = useState<iStudent[]>();

  useEffect(() => {
    let query = "?";
    if (take) query += `take=${take}`;
    if (skip) query += `&skip=${skip}`;
    setLoading(true);
    apiUsingNow
      .get<{ total: number; result: iStudent[] }>(`students${query}`)
      .then((res) => {
        setData(res.data.result);
        setCount(res.data.total);
      })
      .finally(() => setLoading(false));
  }, [take, skip]);

  return (
    <LayoutBasePage title={"Listagem de Alunos"} tools={<Tools isHome />}>
      <TableStudent>
        <>
          {data?.map((student) => (
            <CardStudent key={student.id} student={student} />
          ))}
        </>
      </TableStudent>
    </LayoutBasePage>
  );
};

import { TableCell, TableRow } from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import {
  useAppThemeContext,
  useAuthContext,
  useFrequencyContext,
  usePaginationContext,
} from "../../shared/contexts";
import { iClassDash, iheadCell } from "../../shared/interfaces";
import { TableBase } from "../../shared/components";
import { useNavigate } from "react-router-dom";
import { defineBgColorInfrequency } from "../../shared/scripts";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
dayjs.extend(localizedFormat);

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Turma" },
  { numeric: true, label: "Alunos" },
  { numeric: true, label: "Frequências" },
  { order: "infreq", numeric: true, label: "Infrequência" },
];

interface iCardClassDashProps {
  classDash: iClassDash;
  date: string;
}
const CardClassDash = ({ classDash, date }: iCardClassDashProps) => {
  const { theme } = useAppThemeContext();
  const { createFrequency } = useFrequencyContext();
  const students = classDash.students.map(({ student }) => {
    return { student_id: student.id };
  });
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => {
        createFrequency({
          date,
          class_id: classDash.class.id,
          school_id: classDash.school.id,
          year_id: classDash.year.id,
          students,
        });
      }}
    >
      <TableCell>{classDash.class.name}</TableCell>
      <TableCell align="right">{classDash._count.students}</TableCell>
      <TableCell align="right">{classDash._count.frequencies}</TableCell>
      <TableCell
        align="right"
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(classDash.infreq, theme),
        }}
      >
        {String(classDash.infreq).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const FrequencyPage = () => {
  const navigate = useNavigate();
  const { schoolData } = useAuthContext();
  const { setCount, setIsLoading, defineQuery } = usePaginationContext();
  const [listClassData, setListClassData] = useState<iClassDash[]>();
  const date = dayjs().format("DD/MM/YYYY");

  useEffect(() => {
    if (schoolData) {
      let query = defineQuery(undefined, undefined, undefined, date);
      query += "&is_dash=true";
      setIsLoading(true);
      apiUsingNow
        .get<{ total: number; result: iClassDash[] }>(
          `classes/school/${schoolData.id}${query}`
        )
        .then((res) => {
          if (res.data.total === 0) {
            navigate("/frequency/create");
          }
          setCount(res.data.total);
          setListClassData(res.data.result);
        })
        .finally(() => setIsLoading(false));
    }
  }, [schoolData, defineQuery]);

  return (
    <LayoutBasePage title={"Frequência - " + date} isSchool>
      <TableBase headCells={headCells}>
        {date &&
          listClassData?.map((el) => (
            <CardClassDash key={el.class.id} classDash={el} date={date} />
          ))}
      </TableBase>
    </LayoutBasePage>
  );
};

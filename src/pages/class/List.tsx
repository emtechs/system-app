import { iClassSchoolList, iheadCell } from "../../shared/interfaces";
import {
  useAuthContext,
  useFrequencyContext,
  useTableContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import { useNavigate } from "react-router-dom";
import { LayoutBasePage } from "../../shared/layouts";
import { TableBase, Tools } from "../../shared/components";
import { TableCell, TableRow, useTheme } from "@mui/material";
import { defineBgColorInfrequency } from "../../shared/scripts";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Turma" },
  { order: "name", numeric: false, label: "Escola" },
  { numeric: true, label: "Alunos" },
  { numeric: true, label: "Frequências" },
  { order: "infreq", numeric: true, label: "Infrequência" },
];

interface iCardClassProps {
  el: iClassSchoolList;
}
const CardClass = ({ el }: iCardClassProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() =>
        navigate(
          `/class/${el.class.id}/${el.school.id}/${el.year.id}?class=true`
        )
      }
    >
      <TableCell>{el.class.name}</TableCell>
      <TableCell>{el.school.name}</TableCell>
      <TableCell>{el._count.students}</TableCell>
      <TableCell>{el._count.frequencies}</TableCell>
      <TableCell
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(el.class_infreq, theme),
        }}
      >
        {String(el.class_infreq).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const ListClassPage = () => {
  const { yearId } = useAuthContext();
  const { isInfreq } = useFrequencyContext();
  const { setCount, take, skip, setIsLoading } = useTableContext();
  const [data, setData] = useState<iClassSchoolList[]>();

  useEffect(() => {
    if (yearId) {
      let query = `?year_id=${yearId}&is_active=true`;
      if (isInfreq) query += "&class_infreq=31";
      if (take) query += `&take=${take}`;
      if (skip) query += `&skip=${skip}`;
      setIsLoading(true);
      apiUsingNow
        .get<{ total: number; result: iClassSchoolList[] }>(
          `classes/year/${yearId}${query}`
        )
        .then((res) => {
          setData(res.data.result);
          setCount(res.data.total);
        })
        .finally(() => setIsLoading(false));
    }
  }, [take, skip, isInfreq, yearId]);

  return (
    <LayoutBasePage
      title={"Listagem de Turmas"}
      tools={<Tools isHome isFreq />}
    >
      <TableBase headCells={headCells}>
        {data?.map((el, index) => (
          <CardClass key={index} el={el} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};

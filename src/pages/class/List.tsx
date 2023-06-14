import { iClassSchoolList, iheadCell } from "../../shared/interfaces";
import {
  useAuthContext,
  useFrequencyContext,
  useTableContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { apiClass } from "../../shared/services";
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
          bgcolor: defineBgColorInfrequency(el.infreq, theme),
        }}
      >
        {String(el.infreq).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const ListClassPage = () => {
  const { yearData } = useAuthContext();
  const { isInfreq } = useFrequencyContext();
  const { setCount, setIsLoading, defineQuery } = useTableContext();
  const [data, setData] = useState<iClassSchoolList[]>();

  useEffect(() => {
    if (yearData) {
      let query = defineQuery(yearData.id);
      query += "&is_active=true";

      if (isInfreq) {
        query += "&class_infreq=31";
      }

      setIsLoading(true);
      apiClass
        .listSchool(yearData.id, query)
        .then((res) => {
          setData(res.result);
          setCount(res.total);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isInfreq, yearData, defineQuery]);

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

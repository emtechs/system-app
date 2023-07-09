import { TableCell, TableRow } from "@mui/material";
import { TableBase, Tools } from "../../../shared/components";
import {
  useAppThemeContext,
  useAuthContext,
  usePaginationContext,
} from "../../../shared/contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../../shared/services";
import { iFrequency, iheadCell } from "../../../shared/interfaces";
import { LayoutBasePage } from "../../../shared/layouts";
import { useSearchParams } from "react-router-dom";
import { defineBgColorInfrequency } from "../../../shared/scripts";

const headCells: iheadCell[] = [
  { order: "date", numeric: false, label: "Data" },
  { order: "name", numeric: false, label: "Turma" },
  { numeric: true, label: "Alunos" },
  { order: "school_name", numeric: false, label: "Escola" },
  { order: "infreq", numeric: true, label: "Infrequência" },
];

interface iCardFrequencyProps {
  freq: iFrequency;
}

const CardFrequency = ({ freq }: iCardFrequencyProps) => {
  const { theme } = useAppThemeContext();

  return (
    <TableRow>
      <TableCell>{freq.date}</TableCell>
      <TableCell>{freq.class.name}</TableCell>
      <TableCell align="right">{freq._count.students}</TableCell>
      <TableCell>{freq.school.name}</TableCell>
      <TableCell
        align="right"
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(freq.infrequency, theme),
        }}
      >
        {String(freq.infrequency).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const ListFrequencyClosedAdm = () => {
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  const { yearData } = useAuthContext();
  const { setCount, setIsLoading, query } = usePaginationContext();
  const [data, setData] = useState<iFrequency[]>();

  useEffect(() => {
    if (yearData) {
      let query_data = query(yearData.id);
      query_data += "&status=CLOSED";
      if (date) query_data += `&date=${date}`;
      setIsLoading(true);
      apiUsingNow
        .get<{ total: number; result: iFrequency[] }>(
          `frequencies${query_data}`
        )
        .then((res) => {
          setCount(res.data.total);
          setData(res.data.result);
        })
        .finally(() => setIsLoading(false));
    }
  }, [yearData, date]);
  return (
    <LayoutBasePage
      title={`Frequências Realizadas ${date ? "- " + date : ""}`}
      tools={<Tools isSingle />}
    >
      <TableBase headCells={headCells}>
        {data?.map((el) => (
          <CardFrequency key={el.id} freq={el} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};

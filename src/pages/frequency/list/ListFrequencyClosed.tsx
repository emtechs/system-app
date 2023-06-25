import { TableCell, TableRow, useTheme } from "@mui/material";
import { TableBase, Tools } from "../../../shared/components";
import { useAuthContext, usePaginationContext } from "../../../shared/contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../../shared/services";
import { iFrequency, iheadCell } from "../../../shared/interfaces";
import { LayoutBasePage } from "../../../shared/layouts";
import { defineBgColorInfrequency } from "../../../shared/scripts";
import { useSearchParams } from "react-router-dom";

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
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell>{freq.date}</TableCell>
      <TableCell>{freq.class.class.name}</TableCell>
      <TableCell align="right">{freq._count.students}</TableCell>
      <TableCell>{freq.class.school.name}</TableCell>
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
  const { setCount, take, skip, setIsLoading, defineQuery } =
    usePaginationContext();
  const [data, setData] = useState<iFrequency[]>();

  useEffect(() => {
    if (yearData) {
      let query = defineQuery(yearData.id);
      query += "&status=CLOSED";
      if (date) query += `&date=${date}`;
      setIsLoading(true);
      apiUsingNow
        .get<{ total: number; result: iFrequency[] }>(`frequencies${query}`)
        .then((res) => {
          setCount(res.data.total);
          setData(res.data.result);
        })
        .finally(() => setIsLoading(false));
    }
  }, [yearData, take, skip, date]);
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

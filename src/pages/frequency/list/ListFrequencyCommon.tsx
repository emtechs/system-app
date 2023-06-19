import { TableCell, TableRow, useTheme } from "@mui/material";
import { TableBase, Tools } from "../../../shared/components";
import { useAuthContext, usePaginationContext } from "../../../shared/contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../../shared/services";
import { iFrequency, iheadCell } from "../../../shared/interfaces";
import { LayoutBasePage } from "../../../shared/layouts";
import { defineBgColorInfrequency } from "../../../shared/scripts";
import { useNavigate, useSearchParams } from "react-router-dom";

const headCells: iheadCell[] = [
  { order: "date", numeric: false, label: "Data" },
  { order: "name", numeric: false, label: "Turma" },
  { numeric: true, label: "Alunos" },
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
      <TableCell
        align="right"
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(freq.infreq, theme),
        }}
      >
        {String(freq.infreq).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const ListFrequencyCommon = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  const status = searchParams.get("status");
  const { yearData, schoolData } = useAuthContext();
  const { setCount, take, skip, setIsLoading, defineQuery } =
    usePaginationContext();
  const [data, setData] = useState<iFrequency[]>();

  useEffect(() => {
    if (yearData && schoolData) {
      let query = defineQuery(yearData.id, schoolData.id);
      if (status) {
        query += "&status=" + status;
      } else {
        query += "&status=CLOSED";
      }
      if (date) query += `&date=${date}`;
      setIsLoading(true);
      apiUsingNow
        .get<{ total: number; result: iFrequency[] }>(`frequencies${query}`)
        .then((res) => {
          setCount(res.data.total);
          setData(res.data.result);
          if (res.data.total === 0 && status) navigate("/");
        })
        .finally(() => setIsLoading(false));
    }
  }, [yearData, schoolData, take, skip, date, status]);
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

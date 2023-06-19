import { TableCell, TableRow } from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import {
  useAppThemeContext,
  useAuthContext,
  usePaginationContext,
} from "../../shared/contexts";
import { iFrequency, iheadCell } from "../../shared/interfaces";
import { TableBase, Tools } from "../../shared/components";
import { useNavigate } from "react-router-dom";
import { defineBgColorInfrequency } from "../../shared/scripts";

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
  const navigate = useNavigate();
  const { theme } = useAppThemeContext();

  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/frequency/realize?id=${freq.id}`)}
    >
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

export const FrequencyOpenPage = () => {
  const navigate = useNavigate();
  const { yearData } = useAuthContext();
  const { setCount, take, skip, setIsLoading, defineQuery } =
    usePaginationContext();
  const [data, setData] = useState<iFrequency[]>();

  useEffect(() => {
    if (yearData) {
      let query = defineQuery(yearData.id);
      query += "&status=OPENED";
      setIsLoading(true);
      apiUsingNow
        .get<{ total: number; result: iFrequency[] }>(`frequencies${query}`)
        .then((res) => {
          setCount(res.data.total);
          setData(res.data.result);
          if (res.data.total === 0) navigate("/frequency/create");
        })
        .finally(() => setIsLoading(false));
    }
  }, [yearData, take, skip]);
  return (
    <LayoutBasePage title={"Frequências em aberto"} tools={<Tools isSingle />}>
      <TableBase headCells={headCells}>
        {data?.map((el) => (
          <CardFrequency key={el.id} freq={el} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};

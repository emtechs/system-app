import { Chip, TableCell, TableRow } from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import {
  useAppThemeContext,
  useAuthContext,
  usePaginationContext,
} from "../../shared/contexts";
import { iFrequency, iheadCell } from "../../shared/interfaces";
import { TableBase } from "../../shared/components";
import { Navigate, useNavigate } from "react-router-dom";
import { Outbox } from "@mui/icons-material";
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
      <TableCell>{freq.class.name}</TableCell>
      <TableCell align="right">{freq._count.students}</TableCell>
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

export const FrequencyOpenPage = () => {
  const navigate = useNavigate();
  const { yearData, schoolData } = useAuthContext();
  const { setCount, setIsLoading, query } = usePaginationContext();
  const [data, setData] = useState<iFrequency[]>();

  useEffect(() => {
    if (yearData && schoolData) {
      let query_data = query(yearData.id, schoolData.id);
      query_data += "&status=OPENED";
      setIsLoading(true);
      apiUsingNow
        .get<{ total: number; result: iFrequency[] }>(
          `frequencies${query_data}`
        )
        .then((res) => {
          setCount(res.data.total);
          setData(res.data.result);
          if (res.data.total === 0) navigate("/frequency/create");
        })
        .finally(() => setIsLoading(false));
    }
  }, [yearData, schoolData, query]);

  if (!schoolData) return <Navigate to="/" />;

  return (
    <LayoutBasePage
      title={
        <Chip
          label="Em Aberto"
          color="primary"
          icon={<Outbox sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      }
    >
      <TableBase headCells={headCells}>
        {data?.map((el) => (
          <CardFrequency key={el.id} freq={el} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};

import { Breadcrumbs, Chip, TableCell, TableRow } from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
  usePaginationContext,
} from "../../shared/contexts";
import { iFrequency, iheadCell } from "../../shared/interfaces";
import { LinkRouter, TableBase } from "../../shared/components";
import { Navigate, useNavigate } from "react-router-dom";
import { defineBgColorInfrequency } from "../../shared/scripts";
import { Home, Outbox } from "@mui/icons-material";

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
  const { handleClickButtonTools } = useDrawerContext();
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

  if (!schoolData) return <Navigate to="/" />;

  return (
    <LayoutBasePage
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter
            underline="none"
            color="inherit"
            to="/"
            onClick={handleClickButtonTools}
          >
            <Chip
              clickable
              color="primary"
              variant="outlined"
              label="Página Inicial"
              icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </LinkRouter>
          <Chip
            label="Em Aberto"
            color="primary"
            icon={<Outbox sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </Breadcrumbs>
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

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
import { defineBgColorInfrequency } from "../../../shared/scripts";
import { useNavigate, useSearchParams } from "react-router-dom";

interface iCardFrequencyProps {
  freq: iFrequency;
  isDate: boolean;
}

const CardFrequency = ({ freq, isDate }: iCardFrequencyProps) => {
  const navigate = useNavigate();
  const { theme, mdDown } = useAppThemeContext();

  return (
    <TableRow
      hover
      onClick={() => navigate(`/frequency/student/list?id=${freq.id}`)}
      sx={{ cursor: "pointer" }}
    >
      {isDate && <TableCell>{freq.date}</TableCell>}
      <TableCell>{freq.class.class.name}</TableCell>
      {!isDate ? (
        <TableCell align="right">{freq._count.students}</TableCell>
      ) : (
        !mdDown && <TableCell align="right">{freq._count.students}</TableCell>
      )}
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

export const ListFrequencyCommon = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  const status = searchParams.get("status");
  const { mdDown } = useAppThemeContext();
  const { yearData, schoolData } = useAuthContext();
  const { setCount, take, skip, setIsLoading, defineQuery } =
    usePaginationContext();
  const [data, setData] = useState<iFrequency[]>();

  const headCells: iheadCell[] = !date
    ? mdDown
      ? [
          { order: "date", numeric: false, label: "Data" },
          { order: "name", numeric: false, label: "Turma" },
          { order: "infreq", numeric: true, label: "Infrequência" },
        ]
      : [
          { order: "date", numeric: false, label: "Data" },
          { order: "name", numeric: false, label: "Turma" },
          { numeric: true, label: "Alunos" },
          { order: "infreq", numeric: true, label: "Infrequência" },
        ]
    : [
        { order: "name", numeric: false, label: "Turma" },
        { numeric: true, label: "Alunos" },
        { order: "infreq", numeric: true, label: "Infrequência" },
      ];

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
  }, [yearData, schoolData, take, skip, date, status, defineQuery]);
  return (
    <LayoutBasePage
      title={`Frequências Realizadas ${date ? "- " + date : ""}`}
      tools={<Tools isSingle />}
    >
      <TableBase headCells={headCells}>
        {data?.map((el) => (
          <CardFrequency key={el.id} freq={el} isDate={!date} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};

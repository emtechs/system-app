import { TableCell, TableRow, useTheme } from "@mui/material";
import { TableBase, Tools } from "../../../shared/components";
import { useAuthContext, useTableContext } from "../../../shared/contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../../shared/services";
import { iFrequency, iheadCell } from "../../../shared/interfaces";
import { LayoutBasePage } from "../../../shared/layouts";
import { defineBgColorInfrequency } from "../../../shared/scripts";

const headCells: iheadCell[] = [
  { order: "date", numeric: false, label: "Data" },
  { order: "name", numeric: false, label: "Turma" },
  { numeric: true, label: "Alunos" },
  { order: "name", numeric: false, label: "Escola" },
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
      <TableCell>{freq._count.students}</TableCell>
      <TableCell>{freq.class.school.name}</TableCell>
      <TableCell
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(
            freq.infrequency ? freq.infrequency : 0,
            theme
          ),
        }}
      >
        {String(freq.infrequency).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const ListFrequencyClosedAdm = () => {
  const { yearId } = useAuthContext();
  const { setCount, take, skip, setIsLoading } = useTableContext();
  const [data, setData] = useState<iFrequency[]>();

  useEffect(() => {
    if (yearId) {
      let query = `?year_id=${yearId}&status=CLOSED&is_infreq=true`;
      if (take) query += `&take=${take}`;
      if (skip) query += `&skip=${skip}`;
      setIsLoading(true);
      apiUsingNow
        .get<{ total: number; result: iFrequency[] }>(`frequencies${query}`)
        .then((res) => {
          setCount(res.data.total);
          setData(res.data.result);
        })
        .finally(() => setIsLoading(false));
    }
  }, [yearId, take, skip]);
  return (
    <LayoutBasePage title="Frequências Realizadas" tools={<Tools isHome />}>
      <TableBase headCells={headCells}>
        {data?.map((el) => (
          <CardFrequency key={el.id} freq={el} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};

import { TableCell, TableRow } from "@mui/material";
import { TableBase } from "../../../components";
import { useAppThemeContext } from "../../../contexts";
import { iFrequencyBase, iheadCell } from "../../../interfaces";
import { defineBgColorInfrequency } from "../../../scripts";

interface iTableFrequencyUserProps {
  data: iFrequencyBase[];
}

export const TableFrequencyUser = ({ data }: iTableFrequencyUserProps) => {
  const { theme } = useAppThemeContext();
  const headCells: iheadCell[] = [
    { order: "date", numeric: false, label: "Data" },
    { numeric: false, label: "Escola" },
    { numeric: false, label: "Turma" },
    { numeric: true, label: "Alunos" },
    { order: "infrequency", numeric: true, label: "Infrequência" },
  ];

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCell>{el.date}</TableCell>
          <TableCell>{el.school.name}</TableCell>
          <TableCell>{el.class.name}</TableCell>
          <TableCell align="right">{el.total_students}</TableCell>
          <TableCell
            align="right"
            sx={{
              color: "#fff",
              bgcolor: defineBgColorInfrequency(el.infrequency, theme),
            }}
          >
            {el.infrequency.toFixed(0)}%
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  );
};

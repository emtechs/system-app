import { TableCell, TableRow } from "@mui/material";
import { TableBase } from "../../../components";
import { useAppThemeContext } from "../../../contexts";
import { iFrequencyBase, iheadCell } from "../../../interfaces";
import { defineBgColorInfrequency } from "../../../scripts";

interface iTableFrequencySchoolProps {
  data: iFrequencyBase[];
}

export const TableFrequencySchool = ({ data }: iTableFrequencySchoolProps) => {
  const { theme } = useAppThemeContext();
  const headCells: iheadCell[] = [
    { order: "date", numeric: "left", label: "Data" },
    { order: "class_name", numeric: "left", label: "Turma" },
    { numeric: "right", label: "Alunos" },
    { order: "infrequency", numeric: "right", label: "Infrequência" },
  ];

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCell>{el.date}</TableCell>
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

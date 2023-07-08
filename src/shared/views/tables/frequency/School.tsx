import { TableCell, TableRow } from "@mui/material";
import { PaginationMobile, TableBase } from "../../../components";
import { useAppThemeContext } from "../../../contexts";
import { iFrequencyBase, iheadCell } from "../../../interfaces";
import { defineBgColorInfrequency } from "../../../scripts";

interface iTableFrequencySchoolProps {
  data: iFrequencyBase[];
}

export const TableFrequencySchool = ({ data }: iTableFrequencySchoolProps) => {
  const { mdDown, theme } = useAppThemeContext();
  const headCells: iheadCell[] = [
    { order: "date", numeric: false, label: "Data" },
    { order: "name", numeric: false, label: "Turma" },
    { numeric: true, label: "Alunos" },
    { order: "infreq", numeric: true, label: "Infrequência" },
  ];

  return (
    <>
      <TableBase
        headCells={headCells}
        is_pagination={mdDown ? false : undefined}
      >
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
      {mdDown && <PaginationMobile />}
    </>
  );
};

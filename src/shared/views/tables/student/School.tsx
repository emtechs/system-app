import { useMemo } from "react";
import { iStudent, iheadCell } from "../../../interfaces";
import { useAppThemeContext } from "../../../contexts";
import { TableBase } from "../../../components";
import { TableCell, TableRow } from "@mui/material";
import { defineBgColorInfrequency } from "../../../scripts";

interface iTableStudentSchoolProps {
  data: iStudent[];
}

export const TableStudentSchool = ({ data }: iTableStudentSchoolProps) => {
  const { mdDown, theme } = useAppThemeContext();

  const headCells: iheadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: "registry", numeric: true, label: "Matrícula" },
        { order: "name", numeric: false, label: "Aluno" },
        { order: "infrequency", numeric: true, label: "Infrequência" },
      ];
    return [
      { order: "registry", numeric: true, label: "Matrícula" },
      { order: "name", numeric: false, label: "Aluno" },
      { order: "class_name", numeric: false, label: "Turma" },
      { order: "infrequency", numeric: true, label: "Infrequência" },
    ];
  }, [mdDown]);

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCell align="right">{el.registry}</TableCell>
          <TableCell>{el.name}</TableCell>
          {!mdDown && (
            <>
              <TableCell>{el.class.name}</TableCell>
            </>
          )}
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

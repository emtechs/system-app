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
        { order: "registry", numeric: "right", label: "Matrícula" },
        { order: "name", numeric: "left", label: "Aluno" },
        { order: "infrequency", numeric: "right", label: "Infrequência" },
      ];
    return [
      { order: "registry", numeric: "right", label: "Matrícula" },
      { order: "name", numeric: "left", label: "Aluno" },
      { order: "class_name", numeric: "left", label: "Turma" },
      { order: "infrequency", numeric: "right", label: "Infrequência" },
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

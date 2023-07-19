import { useMemo } from "react";
import { iStudent, iHeadcell } from "../../../interfaces";
import { useAppThemeContext } from "../../../contexts";
import { TableBase } from "../../../components";
import { TableCell, TableRow } from "@mui/material";
import { defineBgColorInfrequency } from "../../../scripts";

interface iTableStudentClassProps {
  data: iStudent[];
}

export const TableStudentClass = ({ data }: iTableStudentClassProps) => {
  const { mdDown, theme } = useAppThemeContext();

  const headCells: iHeadcell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: "registry", numeric: "right", label: "Matrícula" },
        { order: "name", numeric: "left", label: "Aluno" },
        { order: "infrequency", numeric: "right", label: "Infrequência" },
      ];
    return [
      { order: "registry", numeric: "right", label: "Matrícula" },
      { order: "name", numeric: "left", label: "Aluno" },
      { order: "school_name", numeric: "left", label: "Escola" },
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
              <TableCell>{el.school.name}</TableCell>
            </>
          )}
          <TableCell
            align="right"
            sx={{
              color: "#fff",
              bgcolor: defineBgColorInfrequency(el.infrequency, theme),
            }}
          >
            {el.infrequency > 0 ? el.infrequency.toFixed(0) : 0}%
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  );
};

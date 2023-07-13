import { useMemo } from "react";
import { useAppThemeContext } from "../../../contexts";
import { iClass, iheadCell } from "../../../interfaces";
import { TableBase } from "../../../components";
import { defineBgColorInfrequency } from "../../../scripts";
import { TableCell, TableRow } from "@mui/material";

interface iTableClassSchoolProps {
  data: iClass[];
}

export const TableClassSchool = ({ data }: iTableClassSchoolProps) => {
  const { mdDown, theme } = useAppThemeContext();

  const headCells: iheadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: "name", numeric: "left", label: "Turma" },
        { numeric: "left", label: "Escola" },
        { order: "infrequency", numeric: "right", label: "Infrequência" },
      ];
    return [
      { order: "name", numeric: "left", label: "Turma" },
      { order: "students", numeric: "right", label: "Alunos" },
      { order: "frequencies", numeric: "right", label: "Frequências" },
      { order: "infrequency", numeric: "right", label: "Infrequência" },
    ];
  }, [mdDown]);

  return (
    <TableBase headCells={headCells}>
      {data.map((el, index) => (
        <TableRow key={index}>
          <TableCell>{el.name}</TableCell>
          {!mdDown && (
            <>
              <TableCell align="right">{el.students}</TableCell>
              <TableCell align="right">{el.frequencies}</TableCell>
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

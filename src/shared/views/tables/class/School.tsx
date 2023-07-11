import { useMemo } from "react";
import { useAppThemeContext } from "../../../contexts";
import { iClassSchoolList, iheadCell } from "../../../interfaces";
import { TableBase } from "../../../components";
import { TableCell, TableRow } from "@mui/material";
import { defineBgColorInfrequency } from "../../../scripts";

interface iTableClassSchoolProps {
  data: iClassSchoolList[];
}

export const TableClassSchool = ({ data }: iTableClassSchoolProps) => {
  const { mdDown, theme } = useAppThemeContext();

  const headCells: iheadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: "name", numeric: "left", label: "Turma" },
        { order: "infrequency", numeric: "right", label: "Infrequência" },
      ];
    return [
      { order: "name", numeric: "left", label: "Turma" },
      { numeric: "right", label: "Alunos" },
      { numeric: "right", label: "Frequências" },
      { order: "infrequency", numeric: "right", label: "Infrequência" },
    ];
  }, [mdDown]);

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
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

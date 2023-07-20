import { useMemo } from "react";
import { useAppThemeContext } from "../../../../shared/contexts";
import { TableCell, TableRow } from "@mui/material";
import { iHeadcell, iSchoolClass } from "../../../../shared/interfaces";
import { TableBase } from "../../../../shared/components";

interface iTableClassSchoolProps {
  data: iSchoolClass[];
}

export const TableClassSchool = ({ data }: iTableClassSchoolProps) => {
  const { mdDown } = useAppThemeContext();

  const headCells: iHeadcell[] = useMemo(() => {
    if (mdDown) return [{ order: "name", numeric: "left", label: "Turma" }];
    return [
      { order: "name", numeric: "left", label: "Turma" },
      { order: "students", numeric: "right", label: "Alunos" },
      { order: "frequencies", numeric: "right", label: "Frequências" },
    ];
  }, [mdDown]);

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.key}>
          <TableCell>{el.name}</TableCell>
          {!mdDown && (
            <>
              <TableCell align="right">{el.students}</TableCell>
              <TableCell align="right">{el.frequencies}</TableCell>
            </>
          )}
        </TableRow>
      ))}
    </TableBase>
  );
};

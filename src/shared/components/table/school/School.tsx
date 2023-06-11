import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { iChildren, iheadCell } from "../../../interfaces";
import { TableBase, TableSort } from "../frame";

interface iTableSchoolProps extends iChildren {
  is_active?: boolean;
}

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Escola" },
  { order: "director_name", numeric: false, label: "Diretor" },
  { numeric: true, label: "Turmas" },
  { numeric: true, label: "Alunos" },
  { numeric: true, label: "Frequências" },
  { order: "infreq", numeric: true, label: "Infrequência" },
];

export const TableSchool = ({ children, is_active }: iTableSchoolProps) => {
  return (
    <TableBase isPagination>
      <TableHead>
        <TableRow>
          {is_active && <TableCell></TableCell>}
          <TableSort headCells={headCells} />
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </TableBase>
  );
};

import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { iChildren } from "../../../interfaces";
import { TableBase } from "../Base";

interface iTableFrequencyProps extends iChildren {
  isClosed?: boolean;
}

export const TableFrequency = ({
  children,
  isClosed,
}: iTableFrequencyProps) => {
  return (
    <TableBase isPagination>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel>Data</TableSortLabel>
          </TableCell>
          <TableCell>Turma</TableCell>
          <TableCell>Alunos</TableCell>
          <TableCell>Escola</TableCell>
          {isClosed && <TableCell>Infrequência</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </TableBase>
  );
};

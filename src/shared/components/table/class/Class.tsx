import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { iChildren } from "../../../interfaces";
import { TableBase } from "../Base";

export const TableClass = ({ children }: iChildren) => {
  return (
    <TableBase isPagination>
      <TableHead>
        <TableRow>
          <TableCell>Turma</TableCell>
          <TableCell>Escola</TableCell>
          <TableCell>Alunos</TableCell>
          <TableCell>Frequências</TableCell>
          <TableCell>Infrequência</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </TableBase>
  );
};

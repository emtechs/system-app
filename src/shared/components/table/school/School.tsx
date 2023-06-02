import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { iChildren } from "../../../interfaces";

export const TableSchool = ({ children }: iChildren) => {
  return (
    <TableContainer
      sx={{ m: 2, width: "auto" }}
      component={Paper}
      variant="outlined"
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Escola</TableCell>
            <TableCell>Diretor</TableCell>
            <TableCell>Turmas</TableCell>
            <TableCell>Alunos</TableCell>
            <TableCell>Frequências</TableCell>
            <TableCell>Infrequência</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

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

export const TableRetrieveClass = ({ children }: iChildren) => {
  return (
    <TableContainer
      sx={{ m: 2, width: "auto" }}
      component={Paper}
      variant="outlined"
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Matrícula</TableCell>
            <TableCell>Aluno</TableCell>
            <TableCell>Presenças</TableCell>
            <TableCell>Justificadas</TableCell>
            <TableCell>Faltas</TableCell>
            <TableCell>Infrequência</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { iChildren } from "../../interfaces";

export const TableRetrieveFrequency = ({ children }: iChildren) => {
  return (
    <TableContainer
      sx={{ m: 2, width: "auto" }}
      component={Paper}
      variant="outlined"
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Informar</TableCell>
            <TableCell>Matrícula</TableCell>
            <TableCell>Aluno</TableCell>
            <TableCell>Estado da Presença</TableCell>
            <TableCell>Infrequência</TableCell>
            <TableCell>Atualizado Em</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

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

export const TableServer = ({ children }: iChildren) => {
  return (
    <TableContainer
      sx={{ m: 2, width: "auto" }}
      component={Paper}
      variant="outlined"
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome Completo</TableCell>
            <TableCell>CPF</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

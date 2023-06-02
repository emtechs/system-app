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

interface iTableUserProps extends iChildren {
  is_active?: boolean;
}

export const TableUser = ({ children, is_active }: iTableUserProps) => {
  return (
    <TableContainer
      sx={{ m: 2, width: "auto" }}
      component={Paper}
      variant="outlined"
    >
      <Table>
        <TableHead>
          <TableRow>
            {is_active && <TableCell></TableCell>}
            <TableCell>Nome Completo</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Função</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

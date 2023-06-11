import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { iChildren } from "../../../interfaces";
import { TableBase } from "../frame/Base";

interface iTableUserProps extends iChildren {
  is_active?: boolean;
  is_dash?: boolean;
}

export const TableUser = ({
  children,
  is_active,
  is_dash,
}: iTableUserProps) => {
  return (
    <TableBase isPagination>
      <TableHead>
        <TableRow>
          {is_active && <TableCell></TableCell>}
          <TableCell>Nome Completo</TableCell>
          <TableCell>CPF</TableCell>
          <TableCell>Função</TableCell>
          {is_dash && <TableCell>Tela</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </TableBase>
  );
};

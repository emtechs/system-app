import { useMemo } from "react";
import { iClass, iheadCell } from "../../../interfaces";
import { TableBase } from "../../../components";
import { TableCell, TableRow } from "@mui/material";

interface iTableClassProps {
  data: iClass[];
}

export const TableClass = ({ data }: iTableClassProps) => {
  const headCells: iheadCell[] = useMemo(() => {
    return [{ order: "name", numeric: false, label: "Turma" }];
  }, []);

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCell>{el.name}</TableCell>
        </TableRow>
      ))}
    </TableBase>
  );
};

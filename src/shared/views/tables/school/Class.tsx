import { useMemo } from "react";
import { TableCell, TableRow } from "@mui/material";
import { TableBase } from "../../../components";
import { iSchool, iheadCell } from "../../../interfaces";

interface iTableSchoolProps {
  data: iSchool[];
}

export const TableSchoolClass = ({ data }: iTableSchoolProps) => {
  const headCells: iheadCell[] = useMemo(() => {
    return [{ order: "name", numeric: false, label: "Escola" }];
  }, []);

  return (
    <TableBase headCells={headCells} message="Nenhuma escola encotrada">
      {data.map((school) => (
        <TableRow key={school.id}>
          <TableCell>{school.name}</TableCell>
        </TableRow>
      ))}
    </TableBase>
  );
};

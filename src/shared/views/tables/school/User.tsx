import { useMemo } from "react";
import { TableCell, TableRow } from "@mui/material";
import { TableBase } from "../../../components";
import { iSchool, iheadCell } from "../../../interfaces";
import { rolePtBr } from "../../../scripts";

interface iTableSchoolUserProps {
  data: iSchool[];
}

export const TableSchoolUser = ({ data }: iTableSchoolUserProps) => {
  const headCells: iheadCell[] = useMemo(() => {
    return [
      { order: "name", numeric: false, label: "Escola" },
      { numeric: false, label: "Função" },
      { numeric: false, label: "Tela" },
    ];
  }, []);

  return (
    <TableBase headCells={headCells} message="Nenhuma escola encotrada">
      {data.map((school) => (
        <TableRow key={school.id} hover sx={{ cursor: "pointer" }}>
          <TableCell>{school.name}</TableCell>
          <TableCell>{rolePtBr(school.server.role)}</TableCell>
          <TableCell>
            {school.server.dash === "SCHOOL" ? "Escola" : "Frequência"}
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  );
};

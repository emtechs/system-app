import { useMemo } from "react";
import { iClass, iheadCell } from "../../../interfaces";
import { TableBase } from "../../../components";
import { TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface iTableClassProps {
  data: iClass[];
}

export const TableClass = ({ data }: iTableClassProps) => {
  const navigate = useNavigate();
  const headCells: iheadCell[] = useMemo(() => {
    return [
      { order: "name", numeric: false, label: "Turma" },
      { order: "schools", numeric: true, label: "Escolas" },
      { order: "students", numeric: true, label: "Alunos" },
      { order: "frequencies", numeric: true, label: "Frequências" },
    ];
  }, []);

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow
          key={el.id}
          hover
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/class/" + el.id);
          }}
        >
          <TableCell>{el.name}</TableCell>
          <TableCell align="right">{el.schools}</TableCell>
          <TableCell align="right">{el.students}</TableCell>
          <TableCell align="right">{el.frequencies}</TableCell>
        </TableRow>
      ))}
    </TableBase>
  );
};

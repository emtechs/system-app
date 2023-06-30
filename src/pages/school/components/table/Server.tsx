import { useNavigate } from "react-router-dom";
import { iSchoolServer, iheadCell } from "../../../../shared/interfaces";
import {
  useAppThemeContext,
  useDrawerContext,
} from "../../../../shared/contexts";
import { Pagination, TableCell, TableRow } from "@mui/material";
import { rolePtBr } from "../../../../shared/scripts";
import { TableBase } from "../../../../shared/components";

interface iTableServerProps {
  servers: iSchoolServer[];
  school_id: string;
}

export const TableServer = ({ servers, school_id }: iTableServerProps) => {
  const navigate = useNavigate();
  const { mdDown } = useAppThemeContext();
  const { handleClickUser } = useDrawerContext();

  const headCells: iheadCell[] = mdDown
    ? [
        { order: "name", numeric: false, label: "Nome Completo" },
        { numeric: false, label: "CPF" },
      ]
    : [
        { order: "name", numeric: false, label: "Nome Completo" },
        { numeric: false, label: "CPF" },
        { numeric: false, label: "Função" },
        { numeric: false, label: "Tela" },
      ];

  return (
    <>
      <TableBase
        headCells={headCells}
        is_pagination={mdDown ? false : undefined}
      >
        {servers?.map((schoolServer) => (
          <TableRow
            key={schoolServer.server.id}
            hover
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleClickUser();
              navigate(
                `/user?id=${schoolServer.server.id}&school_id=${school_id}&order=name`
              );
            }}
          >
            <TableCell>{schoolServer.server.name}</TableCell>
            <TableCell>{schoolServer.server.cpf}</TableCell>
            {!mdDown && <TableCell>{rolePtBr(schoolServer.role)}</TableCell>}
            {!mdDown && (
              <TableCell>
                {schoolServer.dash === "SCHOOL" ? "Escola" : "Frequência"}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBase>
      {mdDown && <Pagination />}
    </>
  );
};

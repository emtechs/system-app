import { iSchoolServer, iheadCell } from "../../../../shared/interfaces";
import {
  useAppThemeContext,
  useSchoolContext,
} from "../../../../shared/contexts";
import { TableCell, TableRow } from "@mui/material";
import { PaginationMobile, TableBase } from "../../../../shared/components";
import { rolePtBr } from "../../../../shared/scripts";

interface iTableServerProps {
  school_id: string;
  servers?: iSchoolServer[];
}

export const TableServer = ({ school_id, servers }: iTableServerProps) => {
  const { mdDown } = useAppThemeContext();
  const { clickRetrieveSchool } = useSchoolContext();

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
              clickRetrieveSchool(school_id, schoolServer.server.id);
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
      {mdDown && <PaginationMobile />}
    </>
  );
};

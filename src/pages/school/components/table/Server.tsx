import { iSchoolServer, iheadCell } from "../../../../shared/interfaces";
import {
  useAppThemeContext,
  useSchoolContext,
} from "../../../../shared/contexts";
import { TableCell, TableRow } from "@mui/material";
import { PaginationMobile, TableBase } from "../../../../shared/components";

interface iTableServerProps {
  servers?: iSchoolServer[];
}

export const TableServer = ({ servers }: iTableServerProps) => {
  const { mdDown, rolePtBr } = useAppThemeContext();
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
              clickRetrieveSchool(schoolServer.server.id);
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

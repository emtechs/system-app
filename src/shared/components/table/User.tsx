import { useMemo } from "react";
import { useAppThemeContext } from "../../contexts";
import { iUser, iheadCell } from "../../interfaces";
import { TableBase } from "./structure";
import { TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { rolePtBr } from "../../scripts";
import { PaginationMobile } from "../pagination";
import { DialogCreateAdmin } from "../dialog";

interface iTableUserProps {
  data: iUser[];
}

export const TableUser = ({ data }: iTableUserProps) => {
  const navigate = useNavigate();
  const { mdDown } = useAppThemeContext();

  const headCells: iheadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: "name", numeric: false, label: "Nome Completo" },
        { numeric: false, label: "CPF" },
      ];

    return [
      { order: "name", numeric: false, label: "Nome Completo" },
      { numeric: false, label: "CPF" },
      { numeric: false, label: "Função" },
    ];
  }, [mdDown]);

  return (
    <>
      <TableBase
        headCells={headCells}
        is_pagination={mdDown ? false : undefined}
      >
        {data.map((user) => (
          <TableRow
            key={user.id}
            hover
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/user/" + user.id);
            }}
          >
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.cpf}</TableCell>
            {!mdDown && <TableCell>{rolePtBr(user.role)}</TableCell>}
          </TableRow>
        ))}
      </TableBase>
      {mdDown && <PaginationMobile />}
      <DialogCreateAdmin />
    </>
  );
};

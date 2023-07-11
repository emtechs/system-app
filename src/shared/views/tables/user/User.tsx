import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";
import { DialogCreateAdmin, TableBase } from "../../../components";
import { useAppThemeContext, usePaginationContext } from "../../../contexts";
import { iUser, iheadCell } from "../../../interfaces";
import { rolePtBr } from "../../../scripts";

interface iTableUserProps {
  data: iUser[];
}

export const TableUser = ({ data }: iTableUserProps) => {
  const navigate = useNavigate();
  const { mdDown } = useAppThemeContext();
  const { onClickReset } = usePaginationContext();

  const headCells: iheadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: "name", numeric: false, label: "Nome Completo" },
        { numeric: false, label: "CPF" },
      ];

    return [
      { order: "name", numeric: false, label: "Nome Completo" },
      { numeric: false, label: "CPF" },
      { order: "role", numeric: false, label: "Função" },
    ];
  }, [mdDown]);

  return (
    <>
      <TableBase headCells={headCells}>
        {data.map((user) => (
          <TableRow
            key={user.id}
            hover
            sx={{ cursor: "pointer" }}
            onClick={() => {
              onClickReset();
              navigate("/user/" + user.id);
            }}
          >
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.cpf}</TableCell>
            {!mdDown && <TableCell>{rolePtBr(user.role)}</TableCell>}
          </TableRow>
        ))}
      </TableBase>
      <DialogCreateAdmin />
    </>
  );
};

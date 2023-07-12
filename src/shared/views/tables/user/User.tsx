import { useMemo } from "react";
import {
  DialogCreateAdmin,
  TableBase,
  TableCellLink,
  TableRowLink,
} from "../../../components";
import { useAppThemeContext, usePaginationContext } from "../../../contexts";
import { iUser, iheadCell } from "../../../interfaces";
import { rolePtBr } from "../../../scripts";

interface iTableUserProps {
  data: iUser[];
}

export const TableUser = ({ data }: iTableUserProps) => {
  const { mdDown } = useAppThemeContext();
  const { onClickReset } = usePaginationContext();

  const headCells: iheadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: "name", numeric: "left", label: "Nome Completo" },
        { numeric: "left", label: "CPF" },
      ];

    return [
      { order: "name", numeric: "left", label: "Nome Completo" },
      { numeric: "left", label: "CPF" },
      { order: "role", numeric: "left", label: "Função" },
    ];
  }, [mdDown]);

  return (
    <>
      <TableBase headCells={headCells} link="div">
        {data.map((user) => (
          <TableRowLink
            key={user.id}
            href={`/user/${user.id}`}
            onClick={onClickReset}
          >
            <TableCellLink link="div">{user.name}</TableCellLink>
            <TableCellLink link="div">{user.cpf}</TableCellLink>
            {!mdDown && (
              <TableCellLink link="div">{rolePtBr(user.role)}</TableCellLink>
            )}
          </TableRowLink>
        ))}
      </TableBase>
      <DialogCreateAdmin />
    </>
  );
};

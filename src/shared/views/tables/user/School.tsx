import { useMemo } from "react";
import {
  DialogCreateServer,
  TableBase,
  TableCellLink,
  TableRowLink,
} from "../../../components";
import { useAppThemeContext } from "../../../contexts";
import { iUser, iheadCell } from "../../../interfaces";
import { rolePtBr } from "../../../scripts";

interface iTableUserSchoolProps {
  data: iUser[];
  school_id: string;
  getUsers: (query: string, isPage?: boolean) => void;
}

export const TableUserSchool = ({
  data,
  school_id,
  getUsers,
}: iTableUserSchoolProps) => {
  const { mdDown } = useAppThemeContext();

  const headCells: iheadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: "name", numeric: "left", label: "Nome Completo" },
        { numeric: "left", label: "CPF" },
      ];

    return [
      { order: "name", numeric: "left", label: "Nome Completo" },
      { numeric: "left", label: "CPF" },
      { numeric: "left", label: "Função" },
      { numeric: "left", label: "Tela" },
    ];
  }, [mdDown]);

  return (
    <>
      <TableBase headCells={headCells} link="div">
        {data.map((user) => (
          <TableRowLink
            key={user.id}
            href={`/user/${user.id}?school_id=${school_id}`}
          >
            <TableCellLink link="div">{user.name}</TableCellLink>
            <TableCellLink link="div">{user.cpf}</TableCellLink>
            {!mdDown && (
              <TableCellLink link="div">
                {rolePtBr(user.work_school.role)}
              </TableCellLink>
            )}
            {!mdDown && (
              <TableCellLink link="div">
                {user.work_school.dash === "SCHOOL" ? "Escola" : "Frequência"}
              </TableCellLink>
            )}
          </TableRowLink>
        ))}
      </TableBase>
      <DialogCreateServer school_id={school_id} getUsers={getUsers} />
    </>
  );
};

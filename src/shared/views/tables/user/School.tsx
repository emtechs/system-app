import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";
import { DialogCreateServer, TableBase } from "../../../components";
import { useAppThemeContext } from "../../../contexts";
import { iUser, iheadCell } from "../../../interfaces";
import { rolePtBr } from "../../../scripts";

interface iTableUserSchoolProps {
  data: iUser[];
  school_id: string;
  getUsers: (query: string, take: number) => void;
}

export const TableUserSchool = ({
  data,
  school_id,
  getUsers,
}: iTableUserSchoolProps) => {
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
      { numeric: false, label: "Tela" },
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
              navigate("/user/" + user.id + "?school_id=" + school_id);
            }}
          >
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.cpf}</TableCell>
            {!mdDown && (
              <TableCell>{rolePtBr(user.work_school.role)}</TableCell>
            )}
            {!mdDown && (
              <TableCell>
                {user.work_school.dash === "SCHOOL" ? "Escola" : "Frequência"}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBase>
      <DialogCreateServer school_id={school_id} getUsers={getUsers} />
    </>
  );
};

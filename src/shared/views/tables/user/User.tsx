import { useMemo, useState } from "react";
import {
  DialogActiveUser,
  DialogCreateAdmin,
  DialogCreateSchoolServer,
  TableBase,
} from "../../../components";
import { useAppThemeContext, usePaginationContext } from "../../../contexts";
import { iUser, iHeadcell } from "../../../interfaces";
import { rolePtBr } from "../../../scripts";
import { Link, Skeleton, TableCell, TableRow, Typography } from "@mui/material";
import { ActionsUser } from "../actions";

interface iTableUserProps {
  data: iUser[];
}

export const TableUser = ({ data }: iTableUserProps) => {
  const { mdDown } = useAppThemeContext();
  const { isLoading, onClickReset } = usePaginationContext();
  const [userData, setUserData] = useState<iUser>();

  const handleUser = (newUser: iUser) => setUserData(newUser);

  const headCells: iHeadcell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: "name", numeric: "left", label: "Nome Completo" },
        { numeric: "left", label: "CPF" },
        { numeric: "left", label: "Ações" },
      ];

    return [
      { order: "name", numeric: "left", label: "Nome Completo" },
      { numeric: "left", label: "CPF" },
      { order: "role", numeric: "left", label: "Função" },
      { numeric: "left", label: "Ações" },
    ];
  }, [mdDown]);

  return (
    <>
      <TableBase headCells={headCells} message="Nenhum usuário encotrado">
        {data.map((user) => (
          <TableRow key={user.id} hover>
            <TableCell>
              {isLoading ? (
                <Skeleton width={250} />
              ) : user.is_active ? (
                <Typography
                  underline="none"
                  variant="body2"
                  color="inherit"
                  component={Link}
                  href={`/user/${user.id}`}
                  onClick={onClickReset}
                >
                  {user.name}
                </Typography>
              ) : (
                user.name
              )}
            </TableCell>
            <TableCell>
              {isLoading ? <Skeleton width={100} /> : user.cpf}
            </TableCell>
            {!mdDown && (
              <TableCell>
                {isLoading ? <Skeleton width={100} /> : rolePtBr(user.role)}
              </TableCell>
            )}
            <ActionsUser user={user} handleUser={handleUser} />
          </TableRow>
        ))}
      </TableBase>
      <DialogCreateAdmin />
      {userData && <DialogActiveUser user={userData} locale="list" />}
      {userData && <DialogCreateSchoolServer user={userData} locale="data" />}
    </>
  );
};

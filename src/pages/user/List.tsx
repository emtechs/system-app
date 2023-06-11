import { TableCell, TableRow } from "@mui/material";
import { useTableContext } from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iUser, iheadCell } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { TableBase, Tools } from "../../shared/components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { rolePtBr } from "../../shared/scripts";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Nome Completo" },
  { numeric: false, label: "CPF" },
  { numeric: false, label: "Função" },
];

interface iCardUserProps {
  user: iUser;
}

const CardUser = ({ user }: iCardUserProps) => {
  const navigate = useNavigate();
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/user/list/${user.id}`)}
    >
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.cpf}</TableCell>
      <TableCell>{rolePtBr(user.role)}</TableCell>
    </TableRow>
  );
};

export const ListUserPage = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const { setCount, take, skip, setIsLoading } = useTableContext();
  const [listUserData, setListUserData] = useState<iUser[]>();

  useEffect(() => {
    let query = role ? "?role=" + role : "?is_active=true";
    if (take) query += `&take=${take}`;
    if (skip) query += `&skip=${skip}`;
    setIsLoading(true);
    apiUsingNow
      .get<{ total: number; result: iUser[] }>(`users${query}`)
      .then((res) => {
        setListUserData(res.data.result);
        setCount(res.data.total);
      })
      .finally(() => setIsLoading(false));
  }, [role, take, skip]);

  return (
    <LayoutBasePage title="Listagem de Usuários" tools={<Tools isHome />}>
      <TableBase headCells={headCells}>
        {listUserData?.map((el) => (
          <CardUser key={el.id} user={el} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};

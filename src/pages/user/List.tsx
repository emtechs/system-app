import { TableCell, TableRow } from "@mui/material";
import { usePaginationContext } from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iUser, iheadCell } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { TableBase, Tools } from "../../shared/components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { rolePtBr } from "../../shared/scripts";
import { LayoutUserPage } from "./Layout";
import { useDebounce } from "../../shared/hooks";

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
      onClick={() => navigate(`/user?id=${user.id}&order=name`)}
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
  const orderData = searchParams.get("order");
  const { debounce } = useDebounce();
  const { setCount, take, skip, order, setOrder, by, setIsLoading } =
    usePaginationContext();
  const [listUserData, setListUserData] = useState<iUser[]>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    let query = `?is_active=true&by=${by}`;
    if (role) query += `&role=${role}`;
    if (order) {
      query += `&order=${order}`;
    } else if (orderData) {
      setOrder(orderData);
      query += `&order=${orderData}`;
    }
    if (take) query += `&take=${take}`;
    if (skip) query += `&skip=${skip}`;
    if (search) {
      query += `&name=${search}`;
      setIsLoading(true);
      debounce(() => {
        apiUsingNow
          .get<{ total: number; result: iUser[] }>(`users${query}`)
          .then((res) => {
            setListUserData(res.data.result);
            setCount(res.data.total);
          })
          .finally(() => setIsLoading(false));
      });
    } else {
      setIsLoading(true);
      apiUsingNow
        .get<{ total: number; result: iUser[] }>(`users${query}`)
        .then((res) => {
          setListUserData(res.data.result);
          setCount(res.data.total);
        })
        .finally(() => setIsLoading(false));
    }
  }, [take, skip, orderData, order, by, search]);

  return (
    <LayoutUserPage
      title="Listagem de Usuários"
      tools={
        <Tools isHome isUser isSearch search={search} setSearch={setSearch} />
      }
    >
      <TableBase headCells={headCells}>
        {listUserData?.map((el) => (
          <CardUser key={el.id} user={el} />
        ))}
      </TableBase>
    </LayoutUserPage>
  );
};

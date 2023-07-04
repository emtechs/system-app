import { useCallback, useEffect, useState } from "react";
import {
  useAppThemeContext,
  usePaginationContext,
  useUserContext,
} from "../../../shared/contexts";
import { useDebounce } from "../../../shared/hooks";
import { iUser, iheadCell } from "../../../shared/interfaces";
import { TableCell, TableRow } from "@mui/material";
import {
  DialogCreateAdmin,
  PaginationMobile,
  TableBase,
} from "../../../shared/components";
import { apiUser } from "../../../shared/services";
import { rolePtBr } from "../../../shared/scripts";

interface iViewUserProps {
  role: string;
}

export const ViewUser = ({ role }: iViewUserProps) => {
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { search, setRolesData } = useUserContext();
  const { query, defineQuery, setIsLoading, define_step, setCount } =
    usePaginationContext();
  const [listData, setListData] = useState<iUser[]>();

  const getUsers = useCallback(
    (query: string, take: number) => {
      if (mdDown) {
        setIsLoading(true);
        apiUser
          .list(query)
          .then((res) => {
            setListData(res.result);
            setRolesData(res.roles);
            setCount(res.total);
            define_step(res.total, take);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(true);
        apiUser
          .list(query)
          .then((res) => {
            setListData(res.result);
            setRolesData(res.roles);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    },
    [mdDown]
  );

  const queryData = useCallback(
    (take: number) => {
      let query_data = defineQuery() + `&role=${role}`;
      if (mdDown) {
        query_data = query(take);
        return query_data;
      }
      return query_data;
    },
    [defineQuery, query, mdDown, role]
  );

  useEffect(() => {
    const take = 5;
    let query = queryData(take);
    if (search) {
      query += `&name=${search}`;
      debounce(() => {
        getUsers(query, take);
      });
    } else getUsers(query, take);
  }, [queryData, search]);

  const headCells: iheadCell[] = [
    { order: "name", numeric: false, label: "Nome Completo" },
    { numeric: false, label: "CPF" },
    { numeric: false, label: "Função" },
  ];

  return (
    <>
      <TableBase
        headCells={headCells}
        message="Nenhum usuário encotrado"
        is_pagination={mdDown ? false : undefined}
      >
        {listData?.map((el) => (
          <TableRow key={el.id} hover>
            <TableCell>{el.name}</TableCell>
            <TableCell>{el.cpf}</TableCell>
            <TableCell>{rolePtBr(el.role)}</TableCell>
          </TableRow>
        ))}
      </TableBase>
      {mdDown && <PaginationMobile />}
      <DialogCreateAdmin />
    </>
  );
};

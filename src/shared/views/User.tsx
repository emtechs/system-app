import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useAppThemeContext,
  useDialogContext,
  usePaginationContext,
  useUserContext,
} from "../contexts";
import { useDebounce } from "../hooks";
import { iUser, iheadCell } from "../interfaces";
import { apiUser } from "../services";
import {
  DialogCreateAdmin,
  DialogCreateServer,
  PaginationMobile,
  RemoveUser,
  TableBase,
} from "../components";
import { TableCell, TableRow } from "@mui/material";
import { rolePtBr } from "../scripts";

interface iViewUserProps {
  school_id?: string;
  search?: string;
  role?: string;
}

export const ViewUser = ({ search, school_id, role }: iViewUserProps) => {
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { setRolesData } = useUserContext();
  const { handleOpenActive } = useDialogContext();
  const { defineQuery, query, setIsLoading, setCount, define_step } =
    usePaginationContext();
  const [data, setData] = useState<iUser[]>();
  const [work, setWork] = useState<iUser>();

  const getUsers = useCallback(
    (query: string, take: number) => {
      if (mdDown) {
        setIsLoading(true);
        apiUser
          .list(query)
          .then((res) => {
            setData(res.result);
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
            setData(res.result);
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
      let query_data = defineQuery(undefined, school_id);
      if (role) query_data += `&role=${role}`;
      if (mdDown) {
        query_data = query(take, undefined, school_id);
        return query_data;
      }
      return query_data;
    },
    [defineQuery, query, mdDown, school_id, role]
  );

  useEffect(() => {
    const take = 5;
    let query = queryData(take);
    if (search) {
      query += `&name=${search}`;
      debounce(() => {
        getUsers(query, take);
      });
    } else {
      getUsers(query, take);
    }
  }, [queryData, search]);

  const headCells: iheadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: "name", numeric: false, label: "Nome Completo" },
        { numeric: false, label: "CPF" },
      ];

    if (school_id)
      return [
        { order: "name", numeric: false, label: "Nome Completo" },
        { numeric: false, label: "CPF" },
        { numeric: false, label: "Função" },
        { numeric: false, label: "Tela" },
      ];

    return [
      { order: "name", numeric: false, label: "Nome Completo" },
      { numeric: false, label: "CPF" },
      { numeric: false, label: "Função" },
    ];
  }, [mdDown, school_id]);

  return (
    <>
      <TableBase
        headCells={headCells}
        is_pagination={mdDown ? false : undefined}
      >
        {data?.map((user) => (
          <TableRow
            key={user.id}
            hover
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (school_id) {
                setWork(user);
                handleOpenActive();
              }
            }}
          >
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.cpf}</TableCell>
            {!mdDown && (
              <TableCell>
                {school_id
                  ? rolePtBr(user.work_school.role)
                  : rolePtBr(user.role)}
              </TableCell>
            )}
            {!mdDown && school_id && (
              <TableCell>
                {user.work_school.dash === "SCHOOL" ? "Escola" : "Frequência"}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBase>
      {mdDown && <PaginationMobile />}
      {school_id && (
        <DialogCreateServer school_id={school_id} getUsers={getUsers} />
      )}
      {school_id && work && <RemoveUser user={work} getUsers={getUsers} />}
      {!school_id && <DialogCreateAdmin />}
    </>
  );
};

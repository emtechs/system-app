import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useAppThemeContext,
  usePaginationContext,
  useUserContext,
} from "../contexts";
import { useDebounce } from "../hooks";
import { iUser, iViewBaseProps, iheadCell } from "../interfaces";
import { apiUser } from "../services";
import {
  DialogCreateAdmin,
  DialogCreateServer,
  PaginationMobile,
  TableBase,
} from "../components";
import { TableCell, TableRow } from "@mui/material";
import { rolePtBr } from "../scripts";
import { useNavigate } from "react-router-dom";

interface iViewUserProps extends iViewBaseProps {
  school_id?: string;
  role?: string;
}

export const ViewUser = ({ search, school_id, role }: iViewUserProps) => {
  const navigate = useNavigate();
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { setRolesData } = useUserContext();
  const { defineQuery, query, setIsLoading, setCount, define_step } =
    usePaginationContext();
  const [data, setData] = useState<iUser[]>();

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

  const view = useMemo(() => {
    if (school_id)
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
                    {user.work_school.dash === "SCHOOL"
                      ? "Escola"
                      : "Frequência"}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBase>
          {mdDown && <PaginationMobile />}
          <DialogCreateServer school_id={school_id} getUsers={getUsers} />
        </>
      );
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
  }, [headCells, mdDown, data, school_id]);

  return view;
};

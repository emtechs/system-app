import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useAppThemeContext,
  usePaginationContext,
  useUserContext,
} from "../contexts";
import { useDebounce } from "../hooks";
import { iUser, iViewBaseProps } from "../interfaces";
import { apiUser } from "../services";
import { TableServer, TableUser } from "../components";

interface iViewUserProps extends iViewBaseProps {
  school_id?: string;
  role?: string;
}

export const ViewUser = ({ search, school_id, role }: iViewUserProps) => {
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
    [define_step, mdDown, setCount, setIsLoading, setRolesData]
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
  }, [debounce, getUsers, queryData, search]);

  const table = useMemo(() => {
    if (data) {
      if (school_id)
        return (
          <TableServer data={data} getUsers={getUsers} school_id={school_id} />
        );
      return <TableUser data={data} />;
    }
    return <></>;
  }, [data, getUsers, school_id]);

  return table;
};

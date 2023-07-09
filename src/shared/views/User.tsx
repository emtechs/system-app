import { useCallback, useEffect, useMemo, useState } from "react";
import { usePaginationContext, useUserContext } from "../contexts";
import { useDebounce } from "../hooks";
import { iUser, iViewBaseProps } from "../interfaces";
import { apiUser } from "../services";
import { TableUser, TableUserSchool } from "./tables";

interface iViewUserProps extends iViewBaseProps {
  school_id?: string;
  role?: string;
}

export const ViewUser = ({ search, school_id, role }: iViewUserProps) => {
  const { debounce } = useDebounce();
  const { setRolesData } = useUserContext();
  const { setIsLoading, setCount, query } = usePaginationContext();
  const [data, setData] = useState<iUser[]>();

  const getUsers = useCallback((query: string) => {
    setIsLoading(true);
    apiUser
      .list(query)
      .then((res) => {
        setData(res.result);
        setRolesData(res.roles);
        setCount(res.total);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let query_data = query(undefined, school_id);
    if (role) query_data += `&role=${role}`;
    if (search) {
      query_data += `&name=${search}`;
      debounce(() => {
        getUsers(query_data);
      });
    } else {
      getUsers(query_data);
    }
  }, [query, role, school_id, search]);

  const table = useMemo(() => {
    if (data) {
      if (school_id)
        return (
          <TableUserSchool
            data={data}
            getUsers={getUsers}
            school_id={school_id}
          />
        );
      return <TableUser data={data} />;
    }
    return <></>;
  }, [data, getUsers, school_id]);

  return table;
};

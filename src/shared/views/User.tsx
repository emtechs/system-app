import { useCallback, useEffect, useMemo, useState } from "react";
import { usePaginationContext, useUserContext } from "../contexts";
import { useDebounce } from "../hooks";
import { iUser, iViewBaseProps } from "../interfaces";
import { apiUser } from "../services";
import { TableUser, TableUserSchool } from "./tables";
import { PaginationTable } from "../components";
import sortArray from "sort-array";

interface iViewUserProps extends iViewBaseProps {
  school_id?: string;
}

export const ViewUser = ({ search, school_id }: iViewUserProps) => {
  const { debounce } = useDebounce();
  const { setRolesData, role } = useUserContext();
  const {
    setIsLoading,
    setCount,
    query,
    setFace,
    handleFace,
    face,
    order,
    by,
    query_page,
  } = usePaginationContext();
  const [data, setData] = useState<iUser[]>();

  const getUsers = useCallback((query: string, isPage?: boolean) => {
    setIsLoading(true);
    if (isPage) {
      apiUser
        .list(query)
        .then((res) => setData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false));
    } else {
      apiUser
        .list(query)
        .then((res) => {
          setFace(1);
          setData(res.result);
          setRolesData(res.roles);
          setCount(res.total);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const define_query = useCallback(
    (comp: string) => {
      let query_data =
        query(undefined, school_id) + comp + "&order=name" + query_page();
      if (role) query_data += `&role=${role}`;
      return query_data;
    },
    [query, query_page, role, school_id]
  );

  const onClick = () => getUsers(define_query(handleFace(face)), true);

  useEffect(() => {
    let query_data = "";
    if (search) {
      query_data += `&name=${search}`;
      debounce(() => {
        getUsers(define_query(query_data));
      });
    } else {
      getUsers(define_query(query_data));
    }
  }, [debounce, define_query, getUsers, search]);

  const table = useMemo(() => {
    let users: iUser[];
    if (data) {
      users = sortArray<iUser>(data, { by: order, order: by });
      if (school_id)
        return (
          <TableUserSchool
            data={users}
            getUsers={getUsers}
            school_id={school_id}
          />
        );
      return <TableUser data={users} />;
    }
    return <></>;
  }, [by, data, getUsers, order, school_id]);

  return (
    <>
      {table}
      <PaginationTable onClick={onClick} />
    </>
  );
};

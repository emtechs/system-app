import sortArray from "sort-array";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "../hooks";
import { usePaginationContext } from "../contexts";
import { iSchool, iViewBaseProps } from "../interfaces";
import { apiSchool } from "../services";
import { PaginationTable } from "../components";
import { TableSchool, TableSchoolUser } from "./tables";

interface iViewSchoolProps extends iViewBaseProps {
  is_director?: "" | "&is_director=true" | "&is_director=false";
  server_id?: string;
  school_id?: string;
}

export const ViewSchool = ({
  is_director,
  search,
  server_id,
  school_id,
}: iViewSchoolProps) => {
  const { debounce } = useDebounce();
  const {
    query,
    setIsLoading,
    setCount,
    handleFace,
    face,
    order,
    by,
    setFace,
    query_page,
  } = usePaginationContext();
  const [listData, setListData] = useState<iSchool[]>();

  const getSchools = useCallback((query_schools: string, isPage?: boolean) => {
    setIsLoading(true);
    if (isPage) {
      apiSchool
        .list(query_schools)
        .then((res) => setListData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false));
    } else {
      apiSchool
        .list(query_schools)
        .then((res) => {
          setFace(1);
          setListData(res.result);
          setCount(res.total);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const define_query = useCallback(
    (comp: string) => {
      let query_data =
        query(undefined, school_id) + comp + "&order=name" + query_page();
      if (is_director) query_data += is_director;
      if (server_id) query_data += `&server_id=${server_id}`;
      return query_data;
    },
    [is_director, query, query_page, school_id, server_id]
  );

  const onClick = () => getSchools(define_query(handleFace(face)), true);

  useEffect(() => {
    let query_data = "";
    if (search) {
      query_data += `&name=${search}`;
      debounce(() => {
        getSchools(define_query(query_data));
      });
    } else getSchools(define_query(query_data));
  }, [debounce, define_query, getSchools, search]);

  const table = useMemo(() => {
    let listSchool: iSchool[];

    if (listData) {
      if (order === "director_name")
        listSchool = sortArray<iSchool>(listData, {
          by: order,
          order: by,
          computed: { director_name: (row) => row.director?.name },
        });

      listSchool = sortArray<iSchool>(listData, { by: order, order: by });

      if (server_id) return <TableSchoolUser data={listSchool} />;

      return <TableSchool data={listSchool} />;
    }

    return <></>;
  }, [by, listData, order, server_id]);

  return (
    <>
      {table}
      <PaginationTable
        total={listData ? listData.length : 0}
        onClick={onClick}
      />
    </>
  );
};

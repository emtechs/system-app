import { useCallback, useEffect, useMemo } from "react";
import {
  usePaginationContext,
  useSchoolContext,
} from "../../../shared/contexts";
import { useDebounce } from "../../../shared/hooks";
import { iSchool } from "../../../shared/interfaces";
import { TableSchool } from "../components";
import sortArray from "sort-array";

export const ViewSchool = () => {
  const { debounce } = useDebounce();
  const { getSchools, listData } = useSchoolContext();
  const { is_active, is_director, search, order, by } = usePaginationContext();

  const define_query = useCallback(
    (comp: string) => {
      return "?by=asc" + comp + is_director + is_active();
    },
    [is_active, is_director]
  );

  useEffect(() => {
    let query_data = "";
    if (search) {
      console.log(search);
      query_data += `&name=${search}`;
      debounce(() => {
        getSchools(define_query(query_data));
      });
    } else getSchools(define_query(query_data));
  }, [debounce, define_query, getSchools, search]);

  const table = useMemo(() => {
    let listSchool: iSchool[];

    if (order === "director_name")
      listSchool = sortArray<iSchool>(listData, {
        by: order,
        order: by,
        computed: { director_name: (row) => row.director?.name },
      });

    listSchool = sortArray<iSchool>(listData, { by: order, order: by });

    return <TableSchool data={listSchool} />;
  }, [by, listData, order]);

  return table;
};

import sortArray from "sort-array";
import { SyntheticEvent, useCallback, useEffect, useMemo } from "react";
import { useDebounce, useValueTabs } from "../hooks";
import { usePaginationContext, useSchoolContext } from "../contexts";
import { iSchool, iViewBaseProps } from "../interfaces";
import { TabsYear } from "../components";
import { TableSchool, TableSchoolClass, TableSchoolUser } from "./tables";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export const ViewSchool = ({ id }: iViewBaseProps) => {
  const { getSchools, listData } = useSchoolContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const school_id = searchParams.get("school_id") || undefined;
  const year_id = searchParams.get("year_id") || undefined;
  const { debounce } = useDebounce();
  const { query, order, by, search, is_director } = usePaginationContext();
  const { valueTabs } = useValueTabs();

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams(valueTabs(newValue, "year"), { replace: true });
  };

  const define_query = useCallback(
    (comp: string) => {
      let query_data = query(year_id, school_id, id) + comp + is_director;

      if (id) query_data += `&server_id=${id}`;
      return query_data;
    },
    [id, is_director, query, school_id, year_id]
  );

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

      if (id) return <TableSchoolUser data={listSchool} />;

      if (id) return <TableSchoolClass data={listSchool} />;

      return <TableSchool data={listSchool} />;
    }

    return <></>;
  }, [by, id, listData, order]);

  return (
    <Box display="flex" justifyContent="space-between">
      {id && <TabsYear value={year_id} handleChange={handleChange} />}
      <Box flex={1}>{table}</Box>
    </Box>
  );
};

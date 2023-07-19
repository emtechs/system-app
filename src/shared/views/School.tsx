import sortArray from "sort-array";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDebounce } from "../hooks";
import {
  useAuthContext,
  usePaginationContext,
  useSchoolContext,
} from "../contexts";
import { iSchool, iViewBaseProps } from "../interfaces";
import { TabsYear } from "../components";
import { TableSchool, TableSchoolClass, TableSchoolUser } from "./tables";
import { Box } from "@mui/material";
import { useLocation, useSearchParams } from "react-router-dom";

export const ViewSchool = ({ id }: iViewBaseProps) => {
  const location = useLocation();
  const { getSchools, listData } = useSchoolContext();
  const [searchParams] = useSearchParams();
  const school_id = searchParams.get("school_id") || undefined;
  const { debounce } = useDebounce();
  const { query, order, by, search, is_director } = usePaginationContext();
  const { listYear } = useAuthContext();
  const [index, setIndex] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
    setIndex(Number(newValue));
  };

  const class_id = location.pathname.includes("class") ? id : undefined;

  const user_id = location.pathname.includes("user") ? id : undefined;

  const year_id = class_id ? listYear[index].id : undefined;

  const define_query = useCallback(
    (comp: string) => {
      let query_data = query(year_id, school_id, class_id) + comp + is_director;

      if (user_id) query_data += `&server_id=${user_id}`;
      return query_data;
    },
    [class_id, is_director, query, school_id, user_id, year_id]
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

    if (order === "director_name")
      listSchool = sortArray<iSchool>(listData, {
        by: order,
        order: by,
        computed: { director_name: (row) => row.director?.name },
      });

    listSchool = sortArray<iSchool>(listData, { by: order, order: by });

    if (user_id) return <TableSchoolUser data={listSchool} />;

    if (class_id) return <TableSchoolClass data={listSchool} />;

    return <TableSchool data={listSchool} />;
  }, [by, class_id, listData, order, user_id]);

  return (
    <Box display="flex" justifyContent="space-between">
      {class_id && <TabsYear value={index} handleChange={handleChange} />}
      <Box flex={1}>{table}</Box>
    </Box>
  );
};

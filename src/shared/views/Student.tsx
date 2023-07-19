import { useLocation, useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks";
import {
  useAuthContext,
  usePaginationContext,
  useStudentContext,
} from "../contexts";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { iStudent, iViewBaseProps } from "../interfaces";
import { Box } from "@mui/material";
import { PaginationTable, TabsYear } from "../components";
import sortArray from "sort-array";
import {
  TableStudentClass,
  TableStudentSchool,
  TableStudentSchoolClass,
} from "./tables";

export const ViewStudent = ({ id }: iViewBaseProps) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const { listYear } = useAuthContext();
  const { query, handleFace, face, order, by, query_page, search } =
    usePaginationContext();
  const { getStudents, listData } = useStudentContext();
  const [index, setIndex] = useState(0);

  const year_id = listYear[index].id;

  const school_id = useMemo(() => {
    if (location.pathname.includes("school")) return id;

    return searchParams.get("school_id") || undefined;
  }, [id, location, searchParams]);

  const class_id = useMemo(() => {
    if (location.pathname.includes("class")) return id;

    return searchParams.get("class_id") || undefined;
  }, [id, location, searchParams]);

  const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
    setIndex(Number(newValue));
  };

  const define_query = useCallback(
    (comp: string) => {
      const query_data =
        query(year_id, school_id, class_id) +
        comp +
        "&order=name" +
        query_page();
      return query_data;
    },
    [class_id, query, query_page, school_id, year_id]
  );

  const onClick = () => getStudents(define_query(handleFace(face)), true);

  useEffect(() => {
    let query_data = "";
    if (search) {
      query_data += `&name=${search}`;
      debounce(() => {
        getStudents(define_query(query_data));
      });
    } else getStudents(define_query(query_data));
  }, [define_query, search]);

  const table = useMemo(() => {
    let students: iStudent[];

    students = sortArray<iStudent>(listData, { by: order, order: by });
    if (order === "class_name")
      students = sortArray<iStudent>(listData, {
        by: order,
        order: by,
        computed: { class_name: (row) => row.class.name },
      });

    if (order === "school_name")
      students = sortArray<iStudent>(listData, {
        by: order,
        order: by,
        computed: { school_name: (row) => row.school.name },
      });

    if (class_id && school_id)
      return <TableStudentSchoolClass data={students} />;

    if (class_id) return <TableStudentClass data={students} />;

    return <TableStudentSchool data={students} />;
  }, [by, class_id, listData, order, school_id]);

  return (
    <Box display="flex" justifyContent="space-between">
      <TabsYear value={index} handleChange={handleChange} />
      <Box flex={1}>
        {table}
        <PaginationTable
          total={listData ? listData.length : 0}
          onClick={onClick}
        />
      </Box>
    </Box>
  );
};

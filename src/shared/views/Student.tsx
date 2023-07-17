import { useSearchParams } from "react-router-dom";
import { useDebounce, useValueTabs } from "../hooks";
import { usePaginationContext } from "../contexts";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { iStudent, iViewBaseProps } from "../interfaces";
import { apiStudent } from "../services";
import { Box } from "@mui/material";
import { PaginationTable, TabsYear } from "../components";
import sortArray from "sort-array";
import { TableStudentClass, TableStudentSchool } from "./tables";

interface iViewStudentProps extends iViewBaseProps {
  type?: "class" | "school";
}

export const ViewStudent = ({ id, type }: iViewStudentProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const year_id = searchParams.get("year_id") || undefined;
  const { debounce } = useDebounce();
  const {
    setCount,
    setIsLoading,
    query,
    setFace,
    handleFace,
    face,
    order,
    by,
    query_page,
    search,
  } = usePaginationContext();
  const { valueTabs } = useValueTabs();
  const [data, setData] = useState<iStudent[]>();

  const school_id = useMemo(() => {
    if (type === "school") return id;

    return searchParams.get("school_id") || undefined;
  }, [id, searchParams, type]);

  const class_id = useMemo(() => {
    if (type === "class") return id;

    return searchParams.get("class_id") || undefined;
  }, [id, searchParams, type]);

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams(valueTabs(newValue, "year"), { replace: true });
  };

  const getStudents = useCallback((query: string, isPage?: boolean) => {
    setIsLoading(true);
    if (isPage) {
      apiStudent
        .list(query)
        .then((res) => setData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false));
    } else {
      apiStudent
        .list(query)
        .then((res) => {
          setFace(1);
          setData(res.result);
          setCount(res.total);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

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
    if (data) {
      students = sortArray<iStudent>(data, { by: order, order: by });
      if (order === "class_name")
        students = sortArray<iStudent>(data, {
          by: order,
          order: by,
          computed: { class_name: (row) => row.class.name },
        });

      if (order === "school_name")
        students = sortArray<iStudent>(data, {
          by: order,
          order: by,
          computed: { school_name: (row) => row.school.name },
        });

      if (class_id) return <TableStudentClass data={students} />;

      return <TableStudentSchool data={students} />;
    }
    return <></>;
  }, [by, class_id, data, order]);

  return (
    <Box display="flex" justifyContent="space-between">
      <TabsYear value={year_id} handleChange={handleChange} />
      <Box flex={1}>
        {table}
        <PaginationTable total={data ? data.length : 0} onClick={onClick} />
      </Box>
    </Box>
  );
};

import { useParams, useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks";
import { usePaginationContext, useSchoolContext } from "../contexts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { iStudent } from "../interfaces";
import { apiStudent } from "../services";
import { Box, Tab, Tabs } from "@mui/material";
import { PaginationTable } from "../components";
import sortArray from "sort-array";
import { TableStudentSchool } from "./tables";

export const ViewStudent = () => {
  const [searchParams] = useSearchParams();
  const { school_id } = useParams();
  const year_id = searchParams.get("year_id") || undefined;
  const { debounce } = useDebounce();
  const { search, listYear } = useSchoolContext();
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
  } = usePaginationContext();
  const [data, setData] = useState<iStudent[]>();

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
        query(year_id, school_id) + comp + "&order=name" + query_page();
      return query_data;
    },
    [query, query_page, school_id, year_id]
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

      return <TableStudentSchool data={students} />;
    }
    return <></>;
  }, [by, data, order]);

  return (
    <Box display="flex" justifyContent="space-between">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={year_id}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {listYear?.map((el) => (
          <Tab
            key={el.id}
            label={el.year}
            href={"/school/" + school_id + "?view=student&year_id=" + el.id}
            value={el.id}
          />
        ))}
      </Tabs>
      <Box flex={1}>
        {table}
        <PaginationTable total={data ? data.length : 0} onClick={onClick} />
      </Box>
    </Box>
  );
};

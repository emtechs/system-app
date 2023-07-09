import { iClassSchoolList } from "../interfaces";
import { usePaginationContext, useSchoolContext } from "../contexts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiClass } from "../services";
import { useParams, useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks";
import { Box, Tab, Tabs } from "@mui/material";
import { TableClassSchool } from "./tables";
import sortArray from "sort-array";
import { PaginationTable } from "../components";

export const ViewClass = () => {
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
  const [data, setData] = useState<iClassSchoolList[]>();

  const getClasses = useCallback((query: string, isFace?: boolean) => {
    setIsLoading(true);
    if (isFace) {
      apiClass
        .listSchool(query)
        .then((res) => setData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false));
    } else {
      apiClass
        .listSchool(query)
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

  const onClick = () => getClasses(define_query(handleFace(face)), true);

  useEffect(() => {
    let query_data = "";
    if (search) {
      query_data += `&name=${search}`;
      debounce(() => {
        getClasses(define_query(query_data));
      });
    } else getClasses(define_query(query_data));
  }, [define_query, search]);

  const table = useMemo(() => {
    let classes: iClassSchoolList[];
    if (data) {
      classes = sortArray<iClassSchoolList>(data, { by: order, order: by });

      return <TableClassSchool data={classes} />;
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
            href={"/school/" + school_id + "?view=class&year_id=" + el.id}
            value={el.id}
          />
        ))}
      </Tabs>
      <Box flex={1}>
        {table}
        <PaginationTable onClick={onClick} />
      </Box>
    </Box>
  );
};

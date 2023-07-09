import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks";
import { usePaginationContext } from "../contexts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { iFrequencyBase, iViewBaseProps, iYear } from "../interfaces";
import { apiFrequency } from "../services";
import { Box, Tab, Tabs } from "@mui/material";
import { TableFrequencySchool, TableFrequencyUser } from "./tables";
import { PaginationTable } from "../components";
import sortArray from "sort-array";

interface iViewFrequency extends iViewBaseProps {
  listYear?: iYear[];
  school_id?: string;
  user_id?: string;
  table_def: "user" | "school";
}

export const ViewFrequency = ({
  search,
  listYear,
  school_id,
  user_id,
  table_def,
}: iViewFrequency) => {
  const [searchParams] = useSearchParams();
  const year_id = searchParams.get("year_id") || undefined;
  const { debounce } = useDebounce();
  const {
    setCount,
    setIsLoading,
    query,
    setFace,
    face,
    handleFace,
    order,
    by,
    query_page,
  } = usePaginationContext();
  const [data, setData] = useState<iFrequencyBase[]>();

  const getFrequencies = useCallback((query: string, isPage?: boolean) => {
    setIsLoading(true);
    if (isPage) {
      apiFrequency
        .list(query)
        .then((res) => setData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false));
    } else {
      apiFrequency
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
      let query_data =
        query(year_id, school_id) + comp + "&order=date" + query_page();
      if (user_id) query_data += `&user_id=${user_id}`;
      return query_data;
    },
    [query, query_page, school_id, user_id, year_id]
  );

  const onClick = () => getFrequencies(define_query(handleFace(face)), true);

  useEffect(() => {
    let query_data = "";
    if (search) {
      query_data += `&name=${search}`;
      debounce(() => {
        getFrequencies(define_query(query_data));
      });
    } else getFrequencies(define_query(query_data));
  }, [define_query, search]);

  const table = useMemo(() => {
    let frequencies: iFrequencyBase[];
    if (data) {
      frequencies = sortArray<iFrequencyBase>(data, { by: order, order: by });
      if (order === "class_name")
        frequencies = sortArray<iFrequencyBase>(data, {
          by: order,
          order: by,
          computed: { class_name: (row) => row.class.name },
        });

      switch (table_def) {
        case "school":
          return <TableFrequencySchool data={frequencies} />;

        case "user":
          return <TableFrequencyUser data={frequencies} />;
      }
    }
    return <></>;
  }, [by, data, order, table_def]);

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
            href={"/school/" + school_id + "?view=frequency&year_id=" + el.id}
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

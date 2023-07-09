import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks";
import { usePaginationContext } from "../contexts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { iFrequencyBase, iViewBaseProps, iYear } from "../interfaces";
import { apiFrequency } from "../services";
import { Box, Tab, Tabs } from "@mui/material";
import { TableFrequencySchool, TableFrequencyUser } from "./tables";

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
  const year_id = searchParams.get("year_id");
  const { debounce } = useDebounce();
  const { setCount, setIsLoading, query } = usePaginationContext();
  const [data, setData] = useState<iFrequencyBase[]>();

  const getFrequencies = useCallback((query: string) => {
    setIsLoading(true);
    apiFrequency
      .list(query)
      .then((res) => {
        setData(res.result);
        setCount(res.total);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (year_id) {
      let query_data = query(year_id, school_id);
      if (user_id) query_data += `&user_id=${user_id}`;
      if (search) {
        query_data += `&name=${search}`;
        debounce(() => {
          getFrequencies(query_data);
        });
      } else getFrequencies(query_data);
    }
  }, [query, search, user_id]);

  const table = useMemo(() => {
    if (data) {
      switch (table_def) {
        case "school":
          return <TableFrequencySchool data={data} />;

        case "user":
          return <TableFrequencyUser data={data} />;
      }
    }
    return <></>;
  }, [data, table_def]);

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
      <Box flex={1}>{table}</Box>
    </Box>
  );
};

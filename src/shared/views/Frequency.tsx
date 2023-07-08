import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks";
import { useAppThemeContext, usePaginationContext } from "../contexts";
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
  const { mdDown } = useAppThemeContext();
  const { setCount, setIsLoading, defineQuery, define_step, query } =
    usePaginationContext();
  const [data, setData] = useState<iFrequencyBase[]>();

  const getFrequencies = useCallback(
    (query: string, take: number) => {
      if (mdDown) {
        setIsLoading(true);
        apiFrequency
          .list(query)
          .then((res) => {
            setData(res.result);
            setCount(res.total);
            define_step(res.total, take);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(true);
        apiFrequency
          .list(query)
          .then((res) => {
            setData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    },
    [mdDown]
  );

  const queryData = useCallback(
    (take: number) => {
      if (year_id) {
        let query_data = defineQuery(year_id, school_id);
        if (mdDown) {
          query_data = query(take, year_id, school_id);
          return query_data;
        }
        return query_data;
      }
      return "";
    },
    [year_id, defineQuery, school_id, mdDown, query]
  );

  useEffect(() => {
    const take = 5;
    let query = queryData(take);
    if (user_id) query += `&user_id=${user_id}`;
    if (search) {
      query += `&name=${search}`;
      debounce(() => {
        getFrequencies(query, take);
      });
    } else getFrequencies(query, take);
  }, [queryData, search, user_id]);

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

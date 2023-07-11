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
import { iFrequencyBase } from "../interfaces";
import { apiFrequency } from "../services";
import { Box } from "@mui/material";
import { TableFrequencySchool, TableFrequencyUser } from "./tables";
import { PaginationTable, TabsYear } from "../components";
import sortArray from "sort-array";

interface iViewFrequency {
  school_id?: string;
  user_id?: string;
  table_def: "user" | "school";
}

export const ViewFrequency = ({
  school_id,
  user_id,
  table_def,
}: iViewFrequency) => {
  const [searchParams, setSearchParams] = useSearchParams();
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
    search,
  } = usePaginationContext();
  const { valueTabs } = useValueTabs();
  const [data, setData] = useState<iFrequencyBase[]>();

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams(valueTabs(newValue, "year"), { replace: true });
  };

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
      <TabsYear value={year_id} handleChange={handleChange} />
      <Box flex={1}>
        {table}
        <PaginationTable total={data ? data.length : 0} onClick={onClick} />
      </Box>
    </Box>
  );
};

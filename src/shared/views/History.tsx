import { useSearchParams } from "react-router-dom";
import { useDebounce, useValueTabs } from "../hooks";
import { usePaginationContext, useUserContext } from "../contexts";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { iFrequencyHistory } from "../interfaces";
import { apiFrequency } from "../services";
import { Box } from "@mui/material";
import { TabsYear } from "../components";
import { TableHistoryUser } from "./tables";

export const ViewHistory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const year_id = searchParams.get("year_id") || undefined;
  const school_id = searchParams.get("school_id") || undefined;
  const { debounce } = useDebounce();
  const { userRetrieve } = useUserContext();
  const { setCount, setIsLoading, query, search } = usePaginationContext();
  const { valueTabs } = useValueTabs();
  const [data, setData] = useState<iFrequencyHistory[]>();

  const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
    setSearchParams(valueTabs(String(newValue), "year"), { replace: true });
  };

  const getHistories = useCallback(
    (query: string) => {
      setIsLoading(true);
      apiFrequency
        .history(query)
        .then((res) => {
          setData(res.result);
          setCount(res.total);
        })
        .finally(() => setIsLoading(false));
    },
    [setCount, setIsLoading]
  );

  useEffect(() => {
    let query_data = query(year_id, school_id);
    if (userRetrieve) query_data += `&user_id=${userRetrieve.id}`;
    if (search) {
      query_data += `&name=${search}`;
      debounce(() => {
        getHistories(query_data);
      });
    } else getHistories(query_data);
  }, [debounce, query, getHistories, search, userRetrieve, year_id, school_id]);

  return (
    <Box display="flex" justifyContent="space-between">
      <TabsYear value={year_id} handleChange={handleChange} />
      <Box flex={1}>{data && <TableHistoryUser data={data} />}</Box>
    </Box>
  );
};

import { iClass, iViewBaseProps } from "../interfaces";
import { useAuthContext, usePaginationContext } from "../contexts";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiClass } from "../services";
import { useDebounce, useValueTabs } from "../hooks";
import { TableClass, TableClassSchool } from "./tables";
import sortArray from "sort-array";
import { PaginationTable, TabsYear } from "../components";
import { useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";

export const ViewClass = ({ id }: iViewBaseProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const year_id = searchParams.get("year_id") || undefined;
  const { debounce } = useDebounce();
  const { setListYear } = useAuthContext();
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
  const [data, setData] = useState<iClass[]>();

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams(valueTabs(newValue, "year"), { replace: true });
  };

  const getClasses = useCallback((query: string, isFace?: boolean) => {
    setIsLoading(true);
    if (isFace) {
      apiClass
        .list(query)
        .then((res) => setData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false));
    } else {
      apiClass
        .list(query)
        .then((res) => {
          setFace(1);
          setData(res.result);
          setCount(res.total);
          setListYear(res.years);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const define_query = useCallback(
    (comp: string) => {
      const query_data =
        query(year_id, id) + comp + "&order=name" + query_page();
      return query_data;
    },
    [query, query_page]
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
    let classes: iClass[];
    if (data) {
      classes = sortArray<iClass>(data, { by: order, order: by });

      if (id) return <TableClassSchool data={classes} />;

      return <TableClass data={classes} />;
    }
    return <></>;
  }, [by, data, order]);

  return (
    <Box display="flex" justifyContent="space-between">
      {id && <TabsYear value={year_id} handleChange={handleChange} />}
      <Box flex={1}>
        {table}
        <PaginationTable total={data ? data.length : 0} onClick={onClick} />
      </Box>
    </Box>
  );
};

import { iClassSchoolList } from "../interfaces";
import { usePaginationContext } from "../contexts";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiClass } from "../services";
import { useParams, useSearchParams } from "react-router-dom";
import { useDebounce, useValueTabs } from "../hooks";
import { Box } from "@mui/material";
import { TableClassSchool } from "./tables";
import sortArray from "sort-array";
import { PaginationTable, TabsYear } from "../components";

export const ViewClassYear = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { school_id } = useParams();
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
  const [data, setData] = useState<iClassSchoolList[]>();

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams(valueTabs(newValue, "year"), { replace: true });
  };

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
      <TabsYear value={year_id} handleChange={handleChange} />
      <Box flex={1}>
        {table}
        <PaginationTable total={data ? data.length : 0} onClick={onClick} />
      </Box>
    </Box>
  );
};

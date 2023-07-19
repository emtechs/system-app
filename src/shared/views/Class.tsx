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
import { useDebounce } from "../hooks";
import { TableClass, TableClassSchool, TableClassYear } from "./tables";
import sortArray from "sort-array";
import { PaginationTable, TabsYear } from "../components";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

export const ViewClass = ({ id }: iViewBaseProps) => {
  const location = useLocation();
  const { debounce } = useDebounce();
  const { setListYear, listYear } = useAuthContext();
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
  const [data, setData] = useState<iClass[]>();
  const [index, setIndex] = useState(0);

  const year_class_id = location.pathname.includes("year") ? id : undefined;

  const school_id = location.pathname.includes("school") ? id : undefined;

  const year_id = year_class_id ? undefined : listYear[index].id;

  const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
    setIndex(Number(newValue));
  };

  const getClasses = useCallback(
    (query: string, isFace?: boolean) => {
      setIsLoading(true);

      if (year_class_id) {
        if (isFace) {
          apiClass
            .listClass(year_class_id, query)
            .then((res) => setData((old) => old?.concat(res.result)))
            .finally(() => setIsLoading(false));
        } else {
          apiClass
            .listClass(year_class_id, query)
            .then((res) => {
              setFace(1);
              setData(res.result);
              setCount(res.total);
            })
            .finally(() => setIsLoading(false));
        }
      } else {
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
      }
    },
    [year_class_id]
  );

  const define_query = useCallback(
    (comp: string) => {
      if (year_class_id) return query() + comp + "&order=name" + query_page();

      return query(year_id, school_id) + comp + "&order=name" + query_page();
    },
    [query, query_page, school_id, year_class_id, year_id]
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

      if (order === "school_name")
        classes = sortArray<iClass>(data, {
          by: order,
          order: by,
          computed: { school_name: (row) => row.school.name },
        });

      if (year_class_id) return <TableClassYear data={classes} />;

      if (school_id) return <TableClassSchool data={classes} />;

      return <TableClass data={classes} />;
    }
    return <></>;
  }, [by, data, order, school_id, year_class_id]);

  return (
    <Box display="flex" justifyContent="space-between">
      {!year_class_id && <TabsYear value={index} handleChange={handleChange} />}
      <Box flex={1}>
        {table}
        <PaginationTable total={data ? data.length : 0} onClick={onClick} />
      </Box>
    </Box>
  );
};

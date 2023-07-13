import { iClass, iViewBaseProps } from "../interfaces";
import { usePaginationContext } from "../contexts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiClass } from "../services";
import { useDebounce } from "../hooks";
import { TableClassYear } from "./tables";
import sortArray from "sort-array";
import { PaginationTable } from "../components";

export const ViewClassYear = ({ id = "" }: iViewBaseProps) => {
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

  const [data, setData] = useState<iClass[]>();

  const getClasses = useCallback(
    (year_id: string, query: string, isFace?: boolean) => {
      setIsLoading(true);
      if (isFace) {
        apiClass
          .listClass(year_id, query)
          .then((res) => setData((old) => old?.concat(res.result)))
          .finally(() => setIsLoading(false));
      } else {
        apiClass
          .listClass(year_id, query)
          .then((res) => {
            setFace(1);
            setData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    },
    []
  );

  const define_query = useCallback(
    (comp: string) => {
      return query() + comp + "&order=name" + query_page();
    },
    [query, query_page]
  );

  const onClick = () => getClasses(id, define_query(handleFace(face)), true);

  useEffect(() => {
    let query_data = "";
    if (search) {
      query_data += `&name=${search}`;
      debounce(() => {
        getClasses(id, define_query(query_data));
      });
    } else getClasses(id, define_query(query_data));
  }, [define_query, id, search]);

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

      return <TableClassYear data={classes} />;
    }
    return <></>;
  }, [by, data, order]);

  return (
    <>
      {table}
      <PaginationTable total={data ? data.length : 0} onClick={onClick} />
    </>
  );
};

import { iClass } from "../interfaces";
import { usePaginationContext } from "../contexts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiClass } from "../services";
import { useDebounce } from "../hooks";
import { TableClass } from "./tables";
import sortArray from "sort-array";
import { PaginationTable } from "../components";

export const ViewClass = () => {
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
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const define_query = useCallback(
    (comp: string) => {
      const query_data = query() + comp + "&order=name" + query_page();
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

      return <TableClass data={classes} />;
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

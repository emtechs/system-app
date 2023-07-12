import { iClassSchoolList } from "../interfaces";
import { useAuthContext, usePaginationContext } from "../contexts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiClass } from "../services";
import { useDebounce } from "../hooks";
import { TableClassYear } from "./tables";
import sortArray from "sort-array";
import { PaginationTable } from "../components";

export const ViewClassYear = () => {
  const { yearData } = useAuthContext();
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

  const [data, setData] = useState<iClassSchoolList[]>();

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
      let query_data = "";

      if (yearData) query_data = query(yearData.id);

      query_data += comp + "&order=name" + query_page();
      return query_data;
    },
    [query, query_page, yearData]
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

      if (order === "school_name")
        classes = sortArray<iClassSchoolList>(data, {
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

import { useEffect, useMemo, useState } from "react";
import sortArray from "sort-array";
import { apiClass } from "../../../shared/services";
import { usePaginationContext } from "../../../shared/contexts";
import { iStudent, iViewBaseProps } from "../../../shared/interfaces";
import { TableStudentSchoolClass } from "./TableClassStudent";

export const ViewClassStudent = ({ id }: iViewBaseProps) => {
  const { setCount, setIsLoading, order, by } = usePaginationContext();
  const [listData, setListData] = useState<iStudent[]>([]);

  useEffect(() => {
    setIsLoading(true);
    if (id)
      apiClass
        .listYear(id, "?view=student")
        .then((res) => {
          setCount(res.total);
          setListData(res.result);
        })
        .finally(() => setIsLoading(false));
  }, [id]);

  const table = useMemo(() => {
    let students: iStudent[];

    students = sortArray<iStudent>(listData, { by: order, order: by });
    if (order === "class_name")
      students = sortArray<iStudent>(listData, {
        by: order,
        order: by,
        computed: { class_name: (row) => row.class.name },
      });

    if (order === "school_name")
      students = sortArray<iStudent>(listData, {
        by: order,
        order: by,
        computed: { school_name: (row) => row.school.name },
      });

    return <TableStudentSchoolClass data={students} />;
  }, [by, listData, order]);

  return table;
};
